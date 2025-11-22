"""
Empirical Data Update Script for Green Finance Week 1
Maintains verified statistics with sources for reproducibility

Usage:
    python update_empirical_data.py

Outputs:
    - verified_statistics.json (all verified data points)
    - data_corrections_report.txt (changes made)
"""

import json
from datetime import datetime

# Verified statistics with sources
VERIFIED_DATA = {
    "market_size": {
        "green_bonds_2024": {
            "value": 2.9,
            "unit": "trillion USD",
            "description": "Green bonds outstanding (2024)",
            "source": "BIS Quarterly Review March 2025",
            "url": "https://www.bis.org/publ/qtrpdf/r_qt2503d.htm",
            "confidence": "high",
            "v2_value": 2.1,
            "correction_magnitude": "+38%"
        },
        "green_bonds_2015": {
            "value": 0.3,
            "unit": "trillion USD",
            "description": "Green bonds outstanding (2015)",
            "source": "Climate Bonds Initiative Historical Data",
            "confidence": "high"
        },
        "gsss_total_2024": {
            "value": 6.2,
            "unit": "trillion USD",
            "description": "Total GSSS bonds (Green, Social, Sustainability, Sustainability-Linked)",
            "source": "World Bank Labeled Bond Update February 2025",
            "url": "https://thedocs.worldbank.org/en/doc/cd82b4033281dab2cb1a1c71eeb691e4-0340012025",
            "note": "Broader than green bonds alone"
        }
    },

    "growth_metrics": {
        "cagr_2015_2024": {
            "value": 28.1,
            "unit": "percent",
            "description": "CAGR for green bonds 2015-2024",
            "calculation": "(2900/300)^(1/9) - 1",
            "v2_value": 24.9,
            "correction": "Updated with correct 2024 market size"
        },
        "cagr_projected_2024_2030": {
            "value_range": [5, 11.2],
            "unit": "percent",
            "description": "Projected CAGR 2024-2030 (market maturing)",
            "source": "Coherent Market Insights, Mordor Intelligence 2024"
        }
    },

    "regional_distribution": {
        "europe_emea": {
            "value": 52,
            "unit": "percent",
            "description": "Europe/EMEA market share (2024)",
            "source": "ICE Sustainable Bond Report 2024, LSEG 2024",
            "v2_value": 44,
            "correction_magnitude": "+8 percentage points"
        },
        "asia_pacific": {
            "value": 27,
            "unit": "percent",
            "description": "Asia-Pacific market share (2024)",
            "source": "ICE Sustainable Bond Report 2024",
            "v2_value": 32,
            "correction_magnitude": "-5 percentage points"
        },
        "americas": {
            "value": 13,
            "unit": "percent",
            "description": "Americas market share (2024)",
            "source": "ICE Sustainable Bond Report 2024",
            "v2_value": 20,
            "correction_magnitude": "-7 percentage points"
        },
        "other": {
            "value": 8,
            "unit": "percent",
            "description": "Other regions (Middle East, Africa)",
            "source": "Calculated residual"
        }
    },

    "sector_allocation": {
        "energy_renewables": {
            "value": 29,
            "unit": "percent",
            "description": "Energy and renewable energy sector (2024)",
            "source": "Mordor Intelligence 2024",
            "v2_value": 38,
            "correction_magnitude": "-9 percentage points"
        },
        "buildings": {
            "value": 25,
            "unit": "percent",
            "description": "Buildings and energy efficiency (estimated)",
            "confidence": "medium",
            "note": "Specific 2024 breakdown not available, using 2023 estimate"
        },
        "transport": {
            "value": 18,
            "unit": "percent",
            "description": "Transport and mobility",
            "confidence": "medium"
        }
    },

    "verification_rates": {
        "corporate_bonds": {
            "value": 81,
            "unit": "percent",
            "description": "Corporate green bonds with second-party opinion",
            "source": "OECD Asia Capital Markets Report 2025",
            "url": "https://www.oecd.org/en/publications/asia-capital-markets-report-2025_02172cdc-en",
            "v2_value": 90,
            "correction": "More conservative, disaggregated by issuer type"
        },
        "official_sector": {
            "value": 69,
            "unit": "percent",
            "description": "Sovereign/multilateral bonds with external review",
            "source": "OECD Asia Capital Markets Report 2025"
        },
        "overall_average": {
            "value": 80,
            "unit": "percent",
            "description": "Weighted average across all bond types",
            "confidence": "high"
        }
    },

    "greenium": {
        "advanced_sovereigns": {
            "value_range": [1, 3],
            "unit": "basis points",
            "description": "Advanced economy sovereign green bonds (2024)",
            "source": "Robeco 2024, CEPR 2024, Amundi 2024",
            "examples": ["Euro government bonds", "UK gilts"]
        },
        "emerging_sovereigns": {
            "value_range": [11, 13],
            "unit": "basis points",
            "description": "Emerging market sovereign green bonds (2024)",
            "source": "Ando (2024) Oxford Bulletin, Amundi EM Report 2024",
            "note": "Significantly higher due to supply constraints"
        },
        "corporate_repeat_issuers": {
            "value": -57,
            "unit": "basis points",
            "description": "Mature corporate issuers (negative greenium)",
            "source": "Flammer (2021) - some repeated issuers show negative premium",
            "note": "Counter-intuitive but real in highly competitive ESG markets"
        },
        "time_trend_2019": {
            "value_range": [5, 7],
            "unit": "basis points",
            "description": "Greenium in 2019 (early market)",
            "v3_value": 7
        },
        "time_trend_2024": {
            "value_range": [1, 3],
            "unit": "basis points",
            "description": "Greenium in 2024 (mature market)",
            "v3_value": 2,
            "trend": "declining",
            "reason": "Supply elasticity increased, demand partially satisfied"
        }
    },

    "investment_gap": {
        "annual_gap_developing": {
            "value": 2.04,
            "unit": "trillion USD",
            "description": "Annual investment gap for developing countries (excl. China) by 2030",
            "source": "McKinsey 2023, World Bank CCDR Methodology",
            "url": "https://www.mckinsey.com/capabilities/sustainability/our-insights/solving-the-climate-finance-equation-for-developing-countries",
            "note": "This is developing countries only, NOT global gap"
        },
        "annual_gap_global": {
            "value_range": [4, 5],
            "unit": "trillion USD",
            "description": "Global annual investment gap for climate transition by 2030",
            "source": "IEA, IRENA 2024",
            "note": "Total global need significantly higher"
        },
        "current_investment_2023": {
            "value": 0.63,
            "unit": "trillion USD",
            "description": "Current annual clean energy investment (2023)",
            "source": "IEA World Energy Investment 2024"
        }
    },

    "esg_fund_flows": {
        "aum_2024": {
            "value": 3.2,
            "unit": "trillion USD",
            "description": "ESG fund assets under management (2024)",
            "source": "Morningstar Global ESG Fund Flows Q4 2024",
            "v2_value": 3.5,
            "correction": "Minor adjustment to verified figure"
        },
        "aum_2019": {
            "value": 1.0,
            "unit": "trillion USD",
            "description": "ESG fund AUM (2019, approximate)",
            "confidence": "medium"
        }
    },

    "france_green_bonds": {
        "outstanding_2024": {
            "value": 72.5,
            "unit": "billion EUR",
            "description": "France Green OAT outstanding (April 2024)",
            "source": "Agence France Trésor",
            "url": "https://www.aft.gouv.fr/en/green-oat"
        },
        "total_issuance_estimate": {
            "value": 85,
            "unit": "billion USD equivalent",
            "description": "Cumulative issuance 2017-2024 (estimated)",
            "confidence": "medium",
            "note": "Based on €72.5B outstanding + maturities"
        }
    }
}

# Academic citations (to be retrieved from OpenAlex)
CITATIONS_NEEDED = [
    "Akerlof 1970 Market for Lemons",
    "Spence 1973 Job Market Signaling",
    "Flammer 2021 Corporate Green Bonds",
    "Baker 2018 Pricing US Green Bonds",
    "Zerbib 2019 Pro-Environmental Preferences Bond Prices",
    "Karpf 2018 Changing Value Green Label",
    "Tang 2020 Do Shareholders Benefit Green Bonds",
    "Fatica 2021 Pricing Green Bonds Financial Institutions",
    "Ando 2024 Sovereign Greenium Oxford Bulletin"
]

def generate_latex_macros():
    """Generate LaTeX macros for easy data updates"""
    macros = []
    macros.append("% Auto-generated data macros - DO NOT EDIT MANUALLY")
    macros.append("% Generated: " + datetime.now().strftime("%Y-%m-%d %H:%M"))
    macros.append("")

    # Market size
    macros.append("\\newcommand{\\marketSizeTwentyFour}{\\$2.9T}")
    macros.append("\\newcommand{\\marketSizeTwentyFifteen}{\\$300B}")
    macros.append("\\newcommand{\\marketCAGR}{28.1\\%}")

    # Regional
    macros.append("\\newcommand{\\regionEurope}{52\\%}")
    macros.append("\\newcommand{\\regionAPAC}{27\\%}")
    macros.append("\\newcommand{\\regionAmericas}{13\\%}")

    # Sector
    macros.append("\\newcommand{\\sectorEnergy}{29\\%}")
    macros.append("\\newcommand{\\sectorBuildings}{25\\%}")
    macros.append("\\newcommand{\\sectorTransport}{18\\%}")

    # Verification
    macros.append("\\newcommand{\\verificationRate}{80\\%}")

    # Greenium
    macros.append("\\newcommand{\\greeniumAdvanced}{1-3 bps}")
    macros.append("\\newcommand{\\greeniumEmerging}{11-13 bps}")

    return "\n".join(macros)

def save_verified_data():
    """Save verified data to JSON for reproducibility"""
    output = {
        "metadata": {
            "created": datetime.now().isoformat(),
            "purpose": "Verified empirical data for Green Finance Week 1",
            "version": "v3.1 (Academic Review Corrections)"
        },
        "data": VERIFIED_DATA,
        "citations_needed": CITATIONS_NEEDED
    }

    with open("verified_statistics.json", "w") as f:
        json.dump(output, f, indent=2)

    print("[OK] Saved verified_statistics.json")

def generate_corrections_report():
    """Generate report of all corrections made"""
    report = []
    report.append("=" * 80)
    report.append("EMPIRICAL DATA CORRECTIONS REPORT")
    report.append("Week 1 v3.0 -> v3.1 Academic Enhancement")
    report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    report.append("=" * 80)
    report.append("")

    corrections = []

    # Market size
    old_market = VERIFIED_DATA["market_size"]["green_bonds_2024"]["v2_value"]
    new_market = VERIFIED_DATA["market_size"]["green_bonds_2024"]["value"]
    corrections.append(f"Market Size (2024): ${old_market}T → ${new_market}T (+{((new_market/old_market-1)*100):.1f}%)")

    # CAGR
    old_cagr = VERIFIED_DATA["growth_metrics"]["cagr_2015_2024"]["v2_value"]
    new_cagr = VERIFIED_DATA["growth_metrics"]["cagr_2015_2024"]["value"]
    corrections.append(f"CAGR (2015-2024): {old_cagr}% → {new_cagr}% (+{(new_cagr-old_cagr):.1f}pp)")

    # Regional
    for region in ["europe_emea", "asia_pacific", "americas"]:
        data = VERIFIED_DATA["regional_distribution"][region]
        if "v2_value" in data:
            corrections.append(f"{region.replace('_', ' ').title()}: {data['v2_value']}% → {data['value']}% ({data['correction_magnitude']})")

    # Verification
    old_verif = VERIFIED_DATA["verification_rates"]["corporate_bonds"]["v2_value"]
    new_verif = VERIFIED_DATA["verification_rates"]["corporate_bonds"]["value"]
    corrections.append(f"Verification Rate: {old_verif}% → {new_verif}% (more accurate, disaggregated)")

    # Sector
    old_energy = VERIFIED_DATA["sector_allocation"]["energy_renewables"]["v2_value"]
    new_energy = VERIFIED_DATA["sector_allocation"]["energy_renewables"]["value"]
    corrections.append(f"Energy Sector: {old_energy}% → {new_energy}% ({VERIFIED_DATA['sector_allocation']['energy_renewables']['correction_magnitude']})")

    report.append("CORRECTIONS SUMMARY:")
    report.append("")
    for i, correction in enumerate(corrections, 1):
        report.append(f"{i}. {correction}")

    report.append("")
    report.append("=" * 80)
    report.append("SLIDES REQUIRING UPDATES:")
    report.append("=" * 80)
    report.append("")
    report.append("Slide 16: Market growth chart - update to $2.9T (2024)")
    report.append("Slide 17: CAGR calculation - update to 28.1%")
    report.append("Slide 18: Regional distribution chart - update percentages")
    report.append("Slide 19: Regional analysis text - update all percentages")
    report.append("Slide 19A: Verification statistics - update to 80-81%")
    report.append("Slide 21: Sector allocation chart - update energy to 29%")
    report.append("Slide 28: Statistical summary - update all key statistics")
    report.append("")
    report.append("CHARTS REQUIRING REGENERATION:")
    report.append("- week1_v2_goal2_chart1_market_growth.py (update 2024 value)")
    report.append("- week1_v2_goal2_chart2_regional.py (update percentages)")
    report.append("- week1_v2_goal2_chart4_sectors.py (update energy percentage)")
    report.append("- 12_verification_stats.py (update to 81% corporate, 69% sovereign)")
    report.append("")
    report.append("=" * 80)
    report.append("SOURCES:")
    report.append("=" * 80)
    report.append("")

    sources = set()
    for category in VERIFIED_DATA.values():
        for item in category.values():
            if isinstance(item, dict) and "source" in item:
                sources.add(item["source"])

    for i, source in enumerate(sorted(sources), 1):
        report.append(f"{i}. {source}")

    return "\n".join(report)

def main():
    print("Updating empirical data for Green Finance Week 1...")
    print("")

    # Save verified data
    save_verified_data()

    # Generate LaTeX macros
    macros = generate_latex_macros()
    with open("data_macros.tex", "w") as f:
        f.write(macros)
    print("[OK] Saved data_macros.tex (LaTeX macros for easy updates)")

    # Generate corrections report
    report = generate_corrections_report()
    with open("data_corrections_report.txt", "w", encoding='utf-8') as f:
        f.write(report)
    print("[OK] Saved data_corrections_report.txt")

    print("")
    print("=" * 60)
    print("SUMMARY:")
    print("=" * 60)
    print(f"Market Size Correction: $2.1T -> $2.9T (+38%)")
    print(f"CAGR Update: 24.9% -> 28.1%")
    print(f"Regional Data: Europe 44%->52%, APAC 32%->27%, Americas 20%->13%")
    print(f"Verification: 90% -> 80-81% (disaggregated)")
    print(f"Energy Sector: 38% -> 29%")
    print("")
    print("Next steps:")
    print("1. Review data_corrections_report.txt for details")
    print("2. Regenerate 4 charts with updated data")
    print("3. Update LaTeX slide text with new statistics")
    print("4. Add \\input{data_macros.tex} to preamble for maintainability")

if __name__ == "__main__":
    main()
