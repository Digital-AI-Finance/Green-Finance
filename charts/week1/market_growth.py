import matplotlib.pyplot as plt
import numpy as np

# Simulated realistic data for green finance market growth
years = np.array([2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024])
green_finance_volume = np.array([300, 420, 580, 850, 1150, 1300, 1650, 1450, 1750, 2100])  # Billion USD

# Create figure with consistent style
fig, ax = plt.subplots(figsize=(10, 6))

# Plot with professional styling
ax.plot(years, green_finance_volume, marker='o', linewidth=2.5, markersize=8,
        color='#2C9F2C', label='Total Green Finance Volume')
ax.fill_between(years, green_finance_volume, alpha=0.3, color='#2C9F2C')

# Formatting
ax.set_xlabel('Year', fontsize=12, fontweight='bold')
ax.set_ylabel('Volume (Billion USD)', fontsize=12, fontweight='bold')
ax.set_title('Global Green Finance Market Growth\n2015-2024', fontsize=14, fontweight='bold', pad=20)
ax.grid(True, alpha=0.3, linestyle='--')
ax.legend(fontsize=10, loc='upper left')

# Add value labels on points
for year, volume in zip(years, green_finance_volume):
    ax.text(year, volume + 50, f'${volume}B', ha='center', fontsize=9)

plt.tight_layout()
plt.savefig('charts/week1/market_growth.pdf', format='pdf', dpi=300, bbox_inches='tight')
print("Generated: market_growth.pdf")
