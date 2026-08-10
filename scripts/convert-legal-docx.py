#!/usr/bin/env python3
"""Convert legal DOCX files to styled HTML for the landing site."""

from __future__ import annotations

import html
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src/assets"
OUT_DIR = ROOT / "src/content/legal"

W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS = {"w": W_NS}

DOCUMENTS = [
    ("Dater Terms 7 august 2026.docx", "terms.html"),
    ("Dater Privacy Policy 7 august 2026.docx", "privacy.html"),
    ("Dater Community Guidelines 7 august 2026.docx", "community.html"),
    ("Dater Cookie Policy 7 august 2026.docx", "cookies.html"),
]

SKIP_TITLES = {
    "TERMS & CONDITIONS",
    "PRIVACY POLICY",
    "DATER COMMUNITY GUIDELINES",
    "COOKIE POLICY",
}


def w_attr(element, name: str, default: str | None = None) -> str | None:
    return element.get(f"{{{W_NS}}}{name}", default)


def read_relationships(zf: zipfile.ZipFile) -> dict[str, str]:
    try:
        rels_xml = zf.read("word/_rels/document.xml.rels")
    except KeyError:
        return {}

    root = ET.fromstring(rels_xml)
    rels: dict[str, str] = {}
    for rel in root:
        if rel.tag.endswith("Relationship"):
            rels[rel.get("Id")] = rel.get("Target", "")
    return rels


def normalize_href(target: str) -> str:
    if "privacy-policy" in target or target.endswith("/privacy-policy"):
        return "/privacy"
    if "dater.social/terms" in target or target.endswith("/terms"):
        return "/terms"
    if "community-guidelines" in target:
        return "/community-guidelines"
    if "cookie" in target.lower():
        return "/cookies"
    if target.startswith("mailto:"):
        return target
    if target.startswith("http"):
        return target
    return target


def extract_runs(paragraph: ET.Element, rels: dict[str, str]) -> list[dict]:
    runs: list[dict] = []

    for child in paragraph:
        tag = child.tag.split("}", 1)[-1]

        if tag == "hyperlink":
            rid = child.get(f"{{{R_NS}}}id")
            target = rels.get(rid, "")
            link_runs = []
            for r in child.findall("w:r", NS):
                link_runs.extend(extract_runs_from_run(r))
            text = "".join(item["text"] for item in link_runs)
            if text:
                runs.append(
                    {
                        "text": text,
                        "bold": any(item["bold"] for item in link_runs),
                        "href": normalize_href(target),
                    }
                )
            continue

        if tag != "r":
            continue

        runs.extend(extract_runs_from_run(child))

    return runs


def extract_runs_from_run(run: ET.Element) -> list[dict]:
    rpr = run.find("w:rPr", NS)
    bold = False
    size = 0

    if rpr is not None:
        bold_el = rpr.find("w:b", NS)
        if bold_el is not None and w_attr(bold_el, "val", "1") != "0":
            bold = True
        size_el = rpr.find("w:sz", NS)
        if size_el is not None:
            size = int(w_attr(size_el, "val", "0") or 0)

    items: list[dict] = []
    for node in run:
        node_tag = node.tag.split("}", 1)[-1]
        if node_tag == "t" and node.text:
            items.append({"text": node.text, "bold": bold, "size": size})
        elif node_tag == "br":
            items.append({"text": "\n", "bold": bold, "size": size})

    return items


def paragraph_text(runs: list[dict]) -> str:
    return "".join(run["text"] for run in runs).strip()


def paragraph_max_size(runs: list[dict]) -> int:
    return max((run.get("size", 0) for run in runs), default=0)


def paragraph_all_bold(runs: list[dict]) -> bool:
    meaningful = [run for run in runs if run["text"].strip()]
    return bool(meaningful) and all(run["bold"] for run in meaningful)


def classify_paragraph(text: str, runs: list[dict], has_num: bool) -> str:
    if has_num:
        return "li"

    if text in SKIP_TITLES:
        return "skip"

    if re.match(r"^(Last updated on:|Effective Date:|Last Updated:)", text, re.I):
        return "meta"

    all_bold = paragraph_all_bold(runs)
    max_sz = paragraph_max_size(runs)

    if all_bold and re.match(r"^\d+\.\d+\s+", text):
        return "h3"

    if all_bold and re.match(r"^\d+\.\s+", text) and max_sz >= 36:
        return "h2"

    if (
        all_bold
        and max_sz <= 40
        and len(text) < 50
        and not text.endswith(":")
        and " means " not in text
        and not re.match(r"^\d", text)
        and not re.match(r"^(The following|For general|For legal|Grievance Officer|Registered Office)", text, re.I)
    ):
        return "h4"

    return "p"


def render_runs(runs: list[dict]) -> str:
    chunks: list[str] = []

    for run in runs:
        text = run["text"]
        if not text:
            continue

        if run.get("href"):
            href = html.escape(run["href"], quote=True)
            label = html.escape(text)
            if href.startswith("/"):
                chunks.append(f'<a href="{href}" class="legal-link">{label}</a>')
            else:
                chunks.append(f'<a href="{href}" class="legal-link">{label}</a>')
            continue

        escaped = html.escape(text)

        if "\n" in text:
            parts = text.split("\n")
            chunks.append(
                "<br />".join(
                    f"<strong>{html.escape(part)}</strong>" if run["bold"] else html.escape(part)
                    for part in parts
                )
            )
            continue

        email_match = re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", text.strip())
        if email_match:
            address = html.escape(text.strip(), quote=True)
            chunks.append(f'<a href="mailto:{address}" class="legal-link">{address}</a>')
            continue

        if re.match(r"^Email:\s*", text):
            prefix, _, address = text.partition(":")
            address = address.strip()
            if address and "@" in address:
                safe_address = html.escape(address, quote=True)
                chunks.append(
                    f'{html.escape(prefix + ":")} '
                    f'<a href="mailto:{safe_address}" class="legal-link">{html.escape(address)}</a>'
                )
                continue

        if run["bold"]:
            chunks.append(f"<strong>{escaped}</strong>")
        else:
            chunks.append(escaped)

    return "".join(chunks)


def convert_docx(path: Path) -> str:
    with zipfile.ZipFile(path) as zf:
        rels = read_relationships(zf)
        document = ET.fromstring(zf.read("word/document.xml"))

    body = document.find("w:body", NS)
    if body is None:
        return ""

    blocks: list[str] = []
    list_open = False

    def close_list() -> None:
        nonlocal list_open
        if list_open:
            blocks.append("</ul>")
            list_open = False

    for paragraph in body.findall("w:p", NS):
        has_num = paragraph.find(".//w:numPr", NS) is not None
        runs = extract_runs(paragraph, rels)
        text = paragraph_text(runs)

        if not text:
            close_list()
            blocks.append("<div class=\"legal-spacer\" aria-hidden=\"true\"></div>")
            continue

        block_type = classify_paragraph(text, runs, has_num)
        content = render_runs(runs)

        if block_type == "skip":
            close_list()
            continue

        if block_type == "li":
            if not list_open:
                blocks.append("<ul class=\"legal-list\">")
                list_open = True
            blocks.append(f"<li>{content}</li>")
            continue

        close_list()

        if block_type == "meta":
            blocks.append(f'<p class="legal-meta">{content}</p>')
        elif block_type == "h2":
            blocks.append(f"<h2 class=\"legal-h2\">{content}</h2>")
        elif block_type == "h3":
            blocks.append(f"<h3 class=\"legal-h3\">{content}</h3>")
        elif block_type == "h4":
            blocks.append(f"<h4 class=\"legal-h4\">{content}</h4>")
        else:
            blocks.append(f"<p class=\"legal-p\">{content}</p>")

    close_list()

    return "\n".join(blocks)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for source_name, output_name in DOCUMENTS:
        source = ASSETS / source_name
        output = OUT_DIR / output_name
        html_content = convert_docx(source)
        output.write_text(html_content, encoding="utf-8")
        print(f"Wrote {output.relative_to(ROOT)} ({len(html_content)} bytes)")


if __name__ == "__main__":
    main()
