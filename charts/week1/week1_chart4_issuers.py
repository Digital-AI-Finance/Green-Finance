import matplotlib.pyplot as plt

COLORS = {'primary': '#3333B2', 'secondary': '#ADADE0', 'light': '#C1C1E8',
          'lighter': '#CCCCEB', 'lightest': '#D6D6EF', 'neutral': '#7F7F7F'}

def generate_chart():
    try:
        plt.style.use('seaborn-v0_8')
        fig, ax = plt.subplots(figsize=(10, 6))

        labels = ['Corporates', 'Financial\nInstitutions', 'Sovereigns', 'Supranationals', 'Municipalities']
        sizes = [42, 28, 18, 8, 4]
        colors_list = [COLORS['primary'], COLORS['secondary'], COLORS['light'], COLORS['lighter'], COLORS['lightest']]

        wedges, texts, autotexts = ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90,
                                            colors=colors_list, textprops={'fontsize': 10, 'fontweight': 'bold'})

        ax.set_title('Green Finance Market by Issuer Type\n2024 (USD 2.1T)',
                     fontsize=14, fontweight='bold', fontfamily='sans-serif', color=COLORS['primary'], pad=20)

        fig.patch.set_facecolor('white')

        output_path = 'charts/week1/week1_chart4_issuers.pdf'
        plt.tight_layout()
        plt.savefig(output_path, format='pdf', dpi=300, bbox_inches='tight', facecolor='white', edgecolor='none')
        print(f"SUCCESS: Generated {output_path}")
        plt.close()
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == "__main__":
    exit(0 if generate_chart() else 1)
