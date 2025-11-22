import matplotlib.pyplot as plt
import numpy as np

# Green finance instruments market share (2024)
instruments = ['Green Bonds', 'Green Loans', 'SL Bonds', 'Green Equity', 'Carbon Markets']
volumes = [1600, 300, 500, 400, 850]  # Billion USD
colors = ['#2C9F2C', '#45B545', '#5ECC5E', '#78D878', '#91E391']

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Pie chart
ax1.pie(volumes, labels=instruments, autopct='%1.1f%%', startangle=90,
        colors=colors, textprops={'fontsize': 10, 'fontweight': 'bold'})
ax1.set_title('Green Finance Instruments\nMarket Share (2024)', fontsize=12, fontweight='bold')

# Bar chart
bars = ax2.bar(range(len(instruments)), volumes, color=colors, edgecolor='black', linewidth=0.7)
ax2.set_xticks(range(len(instruments)))
ax2.set_xticklabels(instruments, rotation=45, ha='right', fontsize=9)
ax2.set_ylabel('Volume (Billion USD)', fontsize=11, fontweight='bold')
ax2.set_title('Green Finance by Instrument Type', fontsize=12, fontweight='bold')
ax2.grid(True, alpha=0.3, axis='y', linestyle='--')

# Add value labels on bars
for bar, vol in zip(bars, volumes):
    height = bar.get_height()
    ax2.text(bar.get_x() + bar.get_width()/2., height + 30,
             f'${vol}B', ha='center', va='bottom', fontsize=9, fontweight='bold')

plt.tight_layout()
plt.savefig('charts/week1/instrument_breakdown.pdf', format='pdf', dpi=300, bbox_inches='tight')
print("Generated: instrument_breakdown.pdf")
