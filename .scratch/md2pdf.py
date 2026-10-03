#!/usr/bin/env python3
"""Convert comparison markdown to simple readable PDFs for Fariza's review."""
import re, sys
from markdown import markdown
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from xml.sax.saxutils import unescape

def md_to_flowables(text, styles):
    # strip frontmatter
    text = re.sub(r"^---\n.*?\n---\n", "", text, flags=re.S)
    flows = []
    for line in text.split("\n"):
        line = line.rstrip()
        if not line.strip():
            flows.append(Spacer(1, 4 * mm))
            continue
        html = markdown(line)
        # crude: strip tags but keep simple ones
        html = html.replace("<strong>", "<b>").replace("</strong>", "</b>")
        html = html.replace("<em>", "<i>").replace("</em>", "</i>")
        if html.startswith("<h1>"):
            flows.append(Paragraph(unescape(strip(html)[3:-4]), styles["H1"]))
        elif html.startswith("<h2>"):
            flows.append(Paragraph(unescape(strip(html)[3:-4]), styles["H2"]))
        elif html.startswith("<h3>"):
            flows.append(Paragraph(unescape(strip(html)[3:-4]), styles["H3"]))
        elif html.startswith("<ul>") or html.startswith("<ol>"):
            continue
        elif html.startswith("<li>"):
            flows.append(Paragraph("&bull; " + strip(html)[3:-4], styles["Body"]))
        else:
            flows.append(Paragraph(strip(html), styles["Body"]))
    return flows

def strip(html):
    # remove <a href="...">text</a> -> text (keep clean text), drop other tags crudely
    html = re.sub(r'<a [^>]*>(.*?)</a>', r'\1', html)
    html = re.sub(r'<(?!/?(b|i)>)[^>]+>', '', html)
    return html

def main():
    styles = getSampleStyleSheet()
    base = ParagraphStyle(name="Base", fontName="Helvetica", fontSize=10.5, leading=15, alignment=TA_LEFT, spaceAfter=6)
    styles.add(base)
    body = base
    h1 = ParagraphStyle(name="H1x", parent=body, fontName="Helvetica-Bold", fontSize=17, leading=22, spaceAfter=8)
    h2 = ParagraphStyle(name="H2x", parent=body, fontName="Helvetica-Bold", fontSize=13.5, leading=18, spaceBefore=10, spaceAfter=4)
    h3 = ParagraphStyle(name="H3x", parent=body, fontName="Helvetica-BoldOblique", fontSize=11.5, leading=16, spaceBefore=8, spaceAfter=3)
    st = {"Body": body, "H1": h1, "H2": h2, "H3": h3}
    src, dst = sys.argv[1], sys.argv[2]
    text = open(src).read()
    doc = SimpleDocTemplate(dst, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm, topMargin=18 * mm, bottomMargin=18 * mm)
    doc.build(md_to_flowables(text, st))
    print("wrote", dst)

main()
