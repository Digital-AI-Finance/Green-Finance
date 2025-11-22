"""
Generate Academic References for Green Finance Week 1
Manual curation for accuracy (OpenAlex searches unreliable for finance papers)

Usage:
    python generate_references.py

Output:
    - references_slide.tex (ready to insert into LaTeX)
"""

from datetime import datetime

# Manually curated citations (verified accuracy)
REFERENCES = {
    "foundational_theory": [
        {
            "authors": "Akerlof, G.A.",
            "year": 1970,
            "title": "The Market for Lemons: Quality Uncertainty and the Market Mechanism",
            "journal": "Quarterly Journal of Economics",
            "volume": 84,
            "issue": 3,
            "pages": "488-500",
            "doi": "10.2307/1879431"
        },
        {
            "authors": "Spence, M.",
            "year": 1973,
            "title": "Job Market Signaling",
            "journal": "Quarterly Journal of Economics",
            "volume": 87,
            "issue": 3,
            "pages": "355-374",
            "doi": "10.2307/1882010"
        }
    ],

    "green_bond_pricing": [
        {
            "authors": "Zerbib, O.D.",
            "year": 2019,
            "title": "The Effect of Pro-Environmental Preferences on Bond Prices: Evidence from Green Bonds",
            "journal": "Journal of Banking \\& Finance",
            "volume": 98,
            "pages": "39-60",
            "doi": "10.1016/j.jbankfin.2018.10.012",
            "note": "Finds YTM 2 bps lower for green bonds"
        },
        {
            "authors": "Baker, M., Bergstresser, D., Serafeim, G., \\& Wurgler, J.",
            "year": 2018,
            "title": "Financing the Response to Climate Change: The Pricing and Ownership of U.S. Green Bonds",
            "journal": "NBER Working Paper",
            "volume": "25194",
            "doi": "10.3386/w25194",
            "note": "6 bps greenium in US municipal bonds"
        },
        {
            "authors": "Karpf, A., \\& Mandel, A.",
            "year": 2018,
            "title": "The Changing Value of the 'Green' Label on the US Municipal Bond Market",
            "journal": "Nature Climate Change",
            "volume": 8,
            "pages": "161-165",
            "doi": "10.1038/s41558-017-0062-0",
            "note": "Time-varying greenium 5-9 bps"
        },
        {
            "authors": "Ando, S., \\& Greenwood-Nimmo, M.",
            "year": 2024,
            "title": "How Large is the Sovereign Greenium?",
            "journal": "Oxford Bulletin of Economics and Statistics",
            "volume": 86,
            "issue": 3,
            "pages": "594-621",
            "doi": "10.1111/obes.12619",
            "note": "11 bps for emerging markets"
        }
    ],

    "corporate_green_bonds": [
        {
            "authors": "Flammer, C.",
            "year": 2021,
            "title": "Corporate Green Bonds",
            "journal": "Journal of Financial Economics",
            "volume": 142,
            "issue": 2,
            "pages": "499-516",
            "doi": "10.1016/j.jfineco.2021.01.010",
            "note": "Stock price response and additionality analysis"
        },
        {
            "authors": "Tang, D.Y., \\& Zhang, Y.",
            "year": 2020,
            "title": "Do Shareholders Benefit from Green Bonds?",
            "journal": "Journal of Corporate Finance",
            "volume": 61,
            "pages": "101427",
            "doi": "10.1016/j.jcorpfin.2018.12.001",
            "note": "Shareholder wealth effects of green bond issuance"
        },
        {
            "authors": "Fatica, S., Panzica, R., \\& Rancan, M.",
            "year": 2021,
            "title": "The Pricing of Green Bonds: Are Financial Institutions Special?",
            "journal": "Journal of Financial Stability",
            "volume": 54,
            "pages": "100873",
            "doi": "10.1016/j.jfs.2021.100873",
            "note": "Financial sector greenium differences"
        }
    ],

    "market_data": [
        {
            "authors": "BIS",
            "year": 2025,
            "title": "Growth of the Green Bond Market and Greenhouse Gas Emissions",
            "journal": "BIS Quarterly Review",
            "pages": "March 2025",
            "url": "https://www.bis.org/publ/qtrpdf/r\\_qt2503d.htm",
            "note": "$3T outstanding green bonds"
        },
        {
            "authors": "World Bank",
            "year": 2025,
            "title": "Labeled Sustainable Bonds Market Update",
            "journal": "World Bank Group",
            "pages": "February 2025",
            "url": "https://thedocs.worldbank.org/en/doc/cd82b4033281dab2cb1a1c71eeb691e4-0340012025",
            "note": "$6.2T cumulative GSSS issuance"
        },
        {
            "authors": "OECD",
            "year": 2024,
            "title": "Sustainable Bonds: Asia Capital Markets Report 2025",
            "journal": "OECD Publishing",
            "doi": "10.1787/02172cdc-en",
            "note": "81% corporate, 69% sovereign verification rates"
        },
        {
            "authors": "Amundi",
            "year": 2024,
            "title": "Emerging Market Green Bonds Report 2024",
            "journal": "Amundi Research Center",
            "url": "https://research-center.amundi.com/article/emerging-market-green-bonds-report-2024",
            "note": "1.2 bps greenium in 2024"
        }
    ],

    "standards": [
        {
            "authors": "ICMA",
            "year": 2021,
            "title": "Green Bond Principles: Voluntary Process Guidelines for Issuing Green Bonds",
            "journal": "International Capital Market Association",
            "url": "https://www.icmagroup.org/sustainable-finance/the-principles-guidelines-and-handbooks/green-bond-principles-gbp/"
        },
        {
            "authors": "Climate Bonds Initiative",
            "year": 2019,
            "title": "Climate Bonds Standard Version 3.0",
            "journal": "Climate Bonds Initiative",
            "url": "https://www.climatebonds.net/standard/about"
        }
    ]
}

def format_citation(ref):
    """Format single citation in APA style for LaTeX"""
    parts = []

    parts.append(f"\\item {ref['authors']} ({ref['year']}).")
    parts.append(f"{ref['title']}.")

    if "journal" in ref and ref['journal']:
        journal_part = f"\\textit{{{ref['journal']}}}"

        if "volume" in ref and ref['volume']:
            journal_part += f", {ref['volume']}"
            if "issue" in ref and ref['issue']:
                journal_part += f"({ref['issue']})"

        if "pages" in ref and ref['pages']:
            journal_part += f", {ref['pages']}"

        journal_part += "."
        parts.append(journal_part)

    if "doi" in ref and ref['doi']:
        parts.append(f"doi:{ref['doi']}")

    if "url" in ref and ref['url']:
        parts.append(f"Available at: \\url{{{ref['url']}}}")

    return " ".join(parts)

def generate_references_slide():
    """Generate complete references slide in LaTeX"""
    output = []
    output.append("% ============================================================")
    output.append("% REFERENCES SLIDE")
    output.append(f"% Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    output.append("% ============================================================")
    output.append("")
    output.append("\\begin{frame}[t,allowframebreaks]{References}")
    output.append("\\tiny")
    output.append("")

    # Foundational Theory
    output.append("\\textbf{Foundational Economic Theory:}")
    output.append("\\begin{itemize}")
    for ref in REFERENCES["foundational_theory"]:
        output.append(format_citation(ref))
    output.append("\\end{itemize}")
    output.append("")

    # Green Bond Pricing
    output.append("\\textbf{Green Bond Pricing and Greenium:}")
    output.append("\\begin{itemize}")
    for ref in REFERENCES["green_bond_pricing"]:
        output.append(format_citation(ref))
    output.append("\\end{itemize}")
    output.append("")
    output.append("\\framebreak")
    output.append("")

    # Corporate Green Bonds
    output.append("\\textbf{Corporate Green Bonds:}")
    output.append("\\begin{itemize}")
    for ref in REFERENCES["corporate_green_bonds"]:
        output.append(format_citation(ref))
    output.append("\\end{itemize}")
    output.append("")

    # Market Data
    output.append("\\textbf{Market Data and Reports:}")
    output.append("\\begin{itemize}")
    for ref in REFERENCES["market_data"]:
        output.append(format_citation(ref))
    output.append("\\end{itemize}")
    output.append("")
    output.append("\\framebreak")
    output.append("")

    # Standards
    output.append("\\textbf{Standards and Guidelines:}")
    output.append("\\begin{itemize}")
    for ref in REFERENCES["standards"]:
        output.append(format_citation(ref))
    output.append("\\end{itemize}")
    output.append("")

    output.append("\\end{frame}")

    return "\n".join(output)

def main():
    print("Generating academic references for Green Finance Week 1...")
    print("")

    # Generate references slide
    latex_refs = generate_references_slide()

    with open("references_slide.tex", "w", encoding='utf-8') as f:
        f.write(latex_refs)

    print(f"[OK] Generated references_slide.tex")
    print(f"    - {len(REFERENCES['foundational_theory'])} foundational theory papers")
    print(f"    - {len(REFERENCES['green_bond_pricing'])} green bond pricing papers")
    print(f"    - {len(REFERENCES['corporate_green_bonds'])} corporate green bond papers")
    print(f"    - {len(REFERENCES['market_data'])} market data sources")
    print(f"    - {len(REFERENCES['standards'])} standards/guidelines")
    print(f"    Total: {sum(len(v) for v in REFERENCES.values())} references")
    print("")
    print("Next: Insert this slide at the end of Week1_v3.tex")

if __name__ == "__main__":
    main()
