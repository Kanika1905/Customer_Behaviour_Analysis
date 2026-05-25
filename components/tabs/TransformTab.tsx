"use client";

const STEPS = [
  {
    step: 1,
    title: "Loaded raw CSV",
    description: "Read the customer shopping behaviour dataset using pandas and previewed the first 5 rows.",
    code: `import pandas as pd

df = pd.read_csv('customer_shopping_behavior.csv')
df.head()`,
  },
  {
    step: 2,
    title: "Inspected dataset structure",
    description: "Checked shape, column data types, and non-null counts. Found 3,900 rows × 18 columns. Only Review Rating had 37 missing values (float64); all other columns were fully populated.",
    code: `df.info()
# RangeIndex: 3900 entries, 0 to 3899
# Data columns (total 18 columns)
# Review Rating  3863 non-null  float64  ← only column with nulls`,
  },
  {
    step: 3,
    title: "Reviewed summary statistics",
    description: "Used describe() to get min, max, mean, std for numeric columns. Age ranged 18–70, Purchase Amount 20–100 USD, Review Rating 2.5–5.0.",
    code: `df.describe()
# summary statistics (min, max, count, etc.) for numerical columns only`,
  },
  {
    step: 4,
    title: "Identified missing values",
    description: "Confirmed only Review Rating had 37 null values. All other 17 columns had zero nulls.",
    code: `df.isnull().sum()
# Review Rating    37
# all other cols    0`,
  },
  {
    step: 5,
    title: "Filled missing Review Ratings (category-wise median)",
    description: "Instead of filling with the global mean (which ignores category differences), grouped by Category and filled each null with that category's median rating.",
    code: `# Method: category-wise median (better than global mean/median)
df['Review Rating'] = df.groupby('Category')['Review Rating'] \\
    .transform(lambda x: x.fillna(x.median()))

df.isnull().sum()  # verify → all zeros`,
  },
  {
    step: 6,
    title: "Standardised column names",
    description: "Lowercased all column names, replaced spaces with underscores, and renamed the awkward Purchase Amount (USD) column for cleaner SQL-friendly naming.",
    code: `df.columns = df.columns.str.lower()
df.columns = df.columns.str.replace(' ', '_')
df = df.rename(columns={'purchase_amount_(usd)': 'purchase_amount'})

df.columns  # verify new names`,
  },
  {
    step: 7,
    title: "Created age_group feature",
    description: "Used pd.qcut to bin the age column into 4 equal-frequency quartile groups: Young-adult, Adult, Middle-aged, Senior.",
    code: `labels = ['Young-adult', 'Adult', 'Middle-aged', 'Senior']
# qcut splits ages into 4 groups and assigns labels we define
df['age_group'] = pd.qcut(df['age'], q=4, labels=labels)

df[['age', 'age_group']].head(10)`,
  },
  {
    step: 8,
    title: "Encoded purchase frequency as numeric days",
    description: "Mapped the text-based frequency_of_purchases column to a numeric purchase_frequency_days column using a dictionary (e.g. Weekly → 7, Monthly → 30, Annually → 365).",
    code: `frequency_mapping = {
    'Weekly': 7,
    'Monthly': 30,
    'Fortnightly': 14,
    'Quarterly': 90,
    'Bi-Weekly': 14,
    'Annually': 365,
    'Every 3 Months': 90
}
df['purchase_frequency_days'] = df['frequency_of_purchases'].map(frequency_mapping)

df[['purchase_frequency_days', 'frequency_of_purchases']].head(10)`,
  },
  {
    step: 9,
    title: "Dropped redundant promo_code_used column",
    description: "Verified that discount_applied and promo_code_used were identical across all 3,900 rows. Since they were fully redundant, dropped promo_code_used.",
    code: `df[['discount_applied', 'promo_code_used']].head(10)

# Check if all values are equal
(df['discount_applied'] == df['promo_code_used']).all()  # → True

# Drop the redundant column
df = df.drop('promo_code_used', axis=1)`,
  },
  {
    step: 10,
    title: "Loaded cleaned data into PostgreSQL",
    description: "Connected to a local PostgreSQL database using SQLAlchemy and pushed the final cleaned DataFrame into a table named 'customer', replacing it if it already existed.",
    code: `from sqlalchemy import create_engine

engine = create_engine(
    f"postgresql+psycopg2://{username}:{password}@{host}:{port}/{database}"
)

table_name = "customer"
df.to_sql(table_name, engine, if_exists='replace', index=False)

print(f"Data successfully loaded into table '{table_name}' in database '{database}'")`  ,
  },
];

export default function TransformTab() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Data transformation steps</h2>
      <p className="text-sm text-gray-500 mb-6">
        Python + pandas in Jupyter Notebook. Each step below was a cell in the notebook.
      </p>
      <div className="relative pl-8 border-l-2 border-violet-100 space-y-8">
        {STEPS.map(s => (
          <div key={s.step} className="relative">
            <div className="absolute -left-[41px] w-7 h-7 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-semibold">
              {s.step}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">{s.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{s.description}</p>
            <pre className="bg-gray-950 text-green-400 text-xs rounded-lg p-4 overflow-x-auto">
              <code>{s.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}