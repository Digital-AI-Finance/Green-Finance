"""
Fetch Academic Citations using OpenAlex API
For Green Finance Week 1 References

Usage:
    python fetch_citations_openalex.py

Output:
    - academic_citations.json (structured citation data)
    - references_slide.tex (formatted LaTeX references slide)
"""

import requests
import json
from datetime import datetime

# Papers to fetch from OpenAlex
PAPERS_TO_FETCH = [
    {
        "search": "Akerlof Market for Lemons 1970",
        "expected_title": "The Market for Lemons: Quality Uncertainty and the Market Mechanism",
        "key": "akerlof1970"
    },
    {
        "search": "Spence Job Market Signaling 1973",
        "expected_title": "Job Market Signaling",
        "key": "spence1973"
    },
    {
        "search": "Flammer Corporate Green Bonds 2021",
        "expected_title": "Corporate green bonds",
        "key": "flammer2021"
    },
    {
        "search": "Baker Bergstresser Serafeim Wurgler Financing Response Climate Change",
        "expected_title": "Financing the Response to Climate Change",
        "key": "baker2018"
    },
    {
        "search": "Zerbib Pro-Environmental Preferences Bond Prices 2019",
        "expected_title": "The effect of pro-environmental preferences on bond prices",
        "key": "zerbib2019"
    },
    {
        "search": "Karpf Mandel Changing Value Green Label Municipal 2018",
        "expected_title": "The changing value of the 'green' label on the US municipal bond market",
        "key": "karpf2018"
    },
    {
        "search": "Tang Zhang Do Shareholders Benefit Green Bonds 2020",
        "expected_title": "Do shareholders benefit from green bonds",
        "key": "tang2020"
    },
    {
        "search": "Fatica Panzica Rancan Pricing Green Bonds Financial Institutions 2021",
        "expected_title": "The pricing of green bonds: Are financial institutions special",
        "key": "fatica2021"
    },
    {
        "search": "Ando Greenwood-Nimmo Sovereign Greenium 2024",
        "expected_title": "How Large is the Sovereign Greenium",
        "key": "ando2024"
    }
]

def fetch_from_openalex(search_query):
    """Fetch paper metadata from OpenAlex API"""
    base_url = "https://api.openalex.org/works"
    params = {
        "search": search_query,
        "per_page": 1,
        "mailto": "research@university.edu"  # Polite pool for faster response
    }

    try:
        response = requests.get(base_url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if data["results"]:
            return data["results"][0]
        return None
    except Exception as e:
        print(f"Error fetching {search_query}: {e}")
        return None

def format_authors(authorships):
    """Format author list"""
    authors = [a["author"]["display_name"] for a in authorships[:4]]  # Max 4 authors

    if len(authors) > 3:
        return f"{authors[0]}, et al."
    elif len(authors) == 3:
        return f"{authors[0]}, {authors[1]}, & {authors[2]}"
    elif len(authors) == 2:
        return f"{authors[0]} & {authors[1]}"
    else:
        return authors[0] if authors else "Unknown"

def extract_citation_info(paper_data):
    """Extract key citation information"""
    if not paper_data:
        return None

    try:
        publication_year = paper_data.get("publication_year")
        title = paper_data.get("title")
        authors_formatted = format_authors(paper_data.get("authorships", []))

        # Extract journal info
        primary_location = paper_data.get("primary_location", {})
        source = primary_location.get("source", {})
        journal = source.get("display_name", "Unknown Journal")

        # Volume and issue
        biblio = paper_data.get("biblio", {})
        volume = biblio.get("volume", "")
        issue = biblio.get("issue", "")
        first_page = biblio.get("first_page", "")
        last_page = biblio.get("last_page", "")

        # DOI
        doi = paper_data.get("doi", "").replace("https://doi.org/", "")

        return {
            "authors": authors_formatted,
            "year": publication_year,
            "title": title,
            "journal": journal,
            "volume": volume,
            "issue": issue,
            "pages": f"{first_page}-{last_page}" if first_page and last_page else first_page,
            "doi": doi
        }
    except Exception as e:
        print(f"Error extracting citation: {e}")
        return None

def format_apa_citation(citation_info):
    """Format citation in APA style"""
    if not citation_info:
        return None

    parts = []
    parts.append(f"{citation_info['authors']} ({citation_info['year']}).")
    parts.append(f"{citation_info['title']}.")

    if citation_info['journal']:
        journal_part = f"\\textit{{{citation_info['journal']}}}"

        if citation_info['volume']:
            journal_part += f", {citation_info['volume']}"
            if citation_info['issue']:
                journal_part += f"({citation_info['issue']})"

        if citation_info['pages']:
            journal_part += f", {citation_info['pages']}"

        journal_part += "."
        parts.append(journal_part)

    if citation_info['doi']:
        parts.append(f"https://doi.org/{citation_info['doi']}")

    return " ".join(parts)

def main():
    print("Fetching academic citations from OpenAlex...")
    print("")

    citations = {}
    latex_citations = []

    for paper_spec in PAPERS_TO_FETCH:
        print(f"Fetching: {paper_spec['expected_title'][:50]}...")

        paper_data = fetch_from_openalex(paper_spec['search'])

        if paper_data:
            citation_info = extract_citation_info(paper_data)

            if citation_info:
                citations[paper_spec['key']] = citation_info
                latex_formatted = format_apa_citation(citation_info)
                latex_citations.append(latex_formatted)
                print(f"  [OK] Found: {citation_info['authors']} ({citation_info['year']})")
            else:
                print(f"  [WARN] Could not extract citation info")
        else:
            print(f"  [WARN] Not found in OpenAlex")

        print("")

    # Save to JSON
    output = {
        "metadata": {
            "generated": datetime.now().isoformat(),
            "source": "OpenAlex API",
            "count": len(citations)
        },
        "citations": citations
    }

    with open("academic_citations.json", "w", encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"[OK] Saved academic_citations.json ({len(citations)} citations)")

    # Generate LaTeX references slide
    latex_output = []
    latex_output.append("% References Slide - Auto-generated from OpenAlex")
    latex_output.append(f"% Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    latex_output.append("")
    latex_output.append("\\begin{frame}[t,allowframebreaks]{References}")
    latex_output.append("\\tiny")
    latex_output.append("")
    latex_output.append("\\textbf{Foundational Theory:}")
    latex_output.append("\\begin{itemize}")

    # Group by category
    theory_papers = ["akerlof1970", "spence1973"]
    for key in theory_papers:
        if key in citations:
            latex_output.append(f"\\item {latex_citations[PAPERS_TO_FETCH[list(citations.keys()).index(key)]['key'] == key]}")

    latex_output.append("\\end{itemize}")
    latex_output.append("")
    latex_output.append("\\textbf{Green Bond Pricing and Greenium:}")
    latex_output.append("\\begin{itemize}")

    pricing_papers = ["baker2018", "zerbib2019", "ando2024", "karpf2018"]
    for key in pricing_papers:
        if key in citations:
            idx = [i for i, p in enumerate(PAPERS_TO_FETCH) if p['key'] == key][0]
            latex_output.append(f"\\item {latex_citations[idx]}")

    latex_output.append("\\end{itemize}")
    latex_output.append("")
    latex_output.append("\\framebreak")
    latex_output.append("")
    latex_output.append("\\textbf{Corporate Green Bonds:}")
    latex_output.append("\\begin{itemize}")

    corporate_papers = ["flammer2021", "tang2020", "fatica2021"]
    for key in corporate_papers:
        if key in citations:
            idx = [i for i, p in enumerate(PAPERS_TO_FETCH) if p['key'] == key][0]
            latex_output.append(f"\\item {latex_citations[idx]}")

    latex_output.append("\\end{itemize}")
    latex_output.append("")
    latex_output.append("\\end{frame}")

    with open("references_slide.tex", "w", encoding='utf-8') as f:
        f.write("\n".join(latex_output))

    print("[OK] Saved references_slide.tex")
    print("")
    print("=" * 60)
    print(f"Successfully fetched {len(citations)} out of {len(PAPERS_TO_FETCH)} citations")
    print("")
    print("Next: Review references_slide.tex and insert into LaTeX file")

if __name__ == "__main__":
    main()
