import { readFile, writeFile } from 'fs/promises';
import path from 'path';

type ProductContent = {
  slug: string;
  title: string;
  description: string;
  sourceUpdatedAt: string | null;
};

type ProductContentExport = {
  exportedAt: string;
  products: ProductContent[];
};

const contentPath = path.resolve(process.cwd(), 'scratch', 'product-content.json');

const optimizedTitles: Record<string, string> = {
  '30tonskidsteerlogsplittertirprig7z': 'Model 3030 30-Ton Inverted Skid Steer Log Splitter - Tire-to-Tire Design',
  '30tontiretotireupsidedownskidbsrg5': '30-Ton Model 3030 Tire-to-Tire Inverted Skid Steer Log Splitter',
  '4400psi40gpmgascoldwaterpresxzt1bm': '4400 PSI 4.0 GPM Gas Cold Water Pressure Washer - DEWALT 420cc Engine',
  '4400psi42gpm13hp420cccommerc78g1c4': '4400 PSI 4.2 GPM Commercial Gas Pressure Washer - 13 HP 420cc Engine',
  '88ccgaschainsawwith32barheavf6mny5': '88cc Gas Chainsaw - 32-Inch Bar, Heavy-Duty 2-Stroke Power Saw',
  'briggsampstratton20679190ccgwmtssf': 'Briggs & Stratton 20679 Gas Pressure Washer - 2700 PSI, 2.7 GPM, 190cc, 14-Inch Surface Cleaner',
  'briggsampstratton210302800ps1uce7w': 'Briggs & Stratton 21030 Gas Pressure Washer - 2800 PSI, 725EXi 163cc Engine',
  'craftsman42ingeargasridingmo8s19w4': 'CRAFTSMAN 42-Inch Gear-Drive Gas Riding Lawn Mower - 6-Speed',
  'craftsmancmxgram113003742ingk2if9a': 'CRAFTSMAN CMXGRAM1130037 42-Inch Gas Riding Mower - 19 HP Briggs & Stratton',
  'cubcadetcc60028224ccwalkbehipunh5f': 'Cub Cadet CC 600 28-Inch Self-Propelled Gas Lawn Mower - 224cc',
  'cubcadetsc300selfpropelledlahhp4lf': 'Cub Cadet SC300 21-Inch Self-Propelled Gas Lawn Mower - 159cc OHV',
  'cubcadetultimazt142in22hpkoh738btk': 'Cub Cadet Ultima ZT1 42-Inch Zero-Turn Mower - 22 HP Kohler KT7000 V-Twin',
  'dewalt60vmaxchainsawbaretool1at1gf': 'DEWALT DCCS670B 60V MAX FLEXVOLT Chainsaw - 16-Inch, Brushless, Bare Tool',
  'dewaltdccs670x1flexvolt60vma2mf7ge': 'DEWALT DCCS670X1 60V MAX FLEXVOLT Chainsaw Kit - 16-Inch, Battery and Charger',
  'dewaltdxpw2000eelectricpresse3711o': 'DEWALT DXPW2000E Electric Pressure Washer - 2000 PSI, 3.0 GPM',
  'dewaltdxpw34253400psigaspres0eqsmx': 'DEWALT DXPW3425 Gas Pressure Washer - 3400 PSI, 2.5 GPM, Honda GX200',
  'dewaltelectricpressurewasher0a43w1': 'DEWALT DWPW2100 Electric Pressure Washer - 2100 PSI, Corded',
  'egopowerelectricridinglawnmo43ep3b': 'EGO Power+ ZT4204L 42-Inch Zero-Turn Riding Mower Kit - Four 56V 10Ah Batteries',
  'egopowerlm2200sp22aluminumdee3wmb0': 'EGO Power+ LM2200SP 22-Inch Self-Propelled Lawn Mower - Aluminum Deck, Battery and Charger',
  'greenworks80volt18cordlesschnf6dmv': 'Greenworks 2000002 80V 18-Inch Cordless Chainsaw Kit - 2Ah Battery and Charger',
  'honda21hrx217k5vkagaslawnmoweydc2u': 'Honda HRX217K5VKA 21-Inch Self-Propelled Gas Lawn Mower - 187cc, 4-in-1 Versamow',
  'husqvarna350btgasbackpackleav0m6r7': 'Husqvarna 350BT 50.2cc Gas Backpack Leaf Blower - 692 CFM, 180 MPH',
  'husqvarna460ranchergaschains19cpp0': 'Husqvarna 460 Rancher 60.3cc Gas Chainsaw - 24-Inch Bar, 3.6 HP',
  'husqvarna970514302130c28ccculunmz7': 'Husqvarna 130C 28cc Curved-Shaft Gas String Trimmer - Model 970514302',
  'husqvarnaleafblaster350ibcorqdl1aa': 'Husqvarna 350iB 40V Cordless Leaf Blower - 200 MPH, Battery Included',
};

const replacementDescriptions: Record<string, string> = {
  '4400psi40gpmgascoldwaterpresxzt1bm': `This gas-powered cold-water pressure washer combines a 4400 PSI maximum pressure rating with a 4.0 GPM flow rate and a DEWALT 420cc engine. It is configured for demanding outdoor cleaning where both high pressure and strong water flow are needed.

Key specifications:
- Maximum pressure: 4400 PSI
- Maximum flow rate: 4.0 GPM
- Engine: DEWALT 420cc gasoline engine
- Water type: cold water
- Power source: gasoline
- Product type: pressure washer
- Condition: new

Practical applications:
- Cleaning driveways, concrete, patios, and walkways
- Removing dirt and buildup from outdoor equipment
- Washing property exteriors and other compatible hard surfaces
- Supporting frequent residential, farm, or jobsite cleanup

Review the product images and listing details for the exact frame, hose, wand, nozzle, and accessory configuration included with this unit. Always select pressure and nozzle settings appropriate for the surface being cleaned.`,
  'dewaltdxpw34253400psigaspres0eqsmx': `The DEWALT DXPW3425 gas pressure washer delivers up to 3400 PSI at 2.5 GPM and is powered by a Honda GX200 gasoline engine. Its pressure and flow specifications make it suitable for demanding residential and property-maintenance cleaning tasks.

Key specifications:
- Brand: DEWALT
- Model: DXPW3425
- Maximum pressure: 3400 PSI
- Maximum flow rate: 2.5 GPM
- Engine: Honda GX200 gasoline engine
- Water type: cold water
- Power source: gasoline
- Product type: pressure washer
- Condition: new

Practical applications:
- Cleaning driveways, patios, sidewalks, and decks
- Washing compatible siding and exterior surfaces
- Removing dirt from vehicles, tools, and outdoor equipment
- Routine home, yard, and property cleanup

Review the product images and listing details for the exact hose, spray gun, nozzle, and accessory configuration included with this unit. Use a pressure and nozzle setting that is safe for the material being cleaned.`,
};

const phraseReplacements: Array<[RegExp, string]> = [
  [/\nShipping & Returns:[\s\S]*$/i, ''],
  [/•/g, '-'], [/[–—]/g, '-'], [/“|”/g, '"'], [/’/g, "'"], [/®|™/g, ''],
  [/one of the most powerful units available for residential and professional use/gi, 'a high-output unit for residential and professional use'],
  [/handles the largest, toughest hardwood logs/gi, 'is intended for large hardwood logs'],
  [/handles large hardwood logs with ease/gi, 'is intended for large hardwood logs'],
  [/blasts through grease, grime, mud, and years of buildup with ease/gi, 'is designed to remove grease, grime, mud, and built-up dirt'],
  [/The DeWalt DCCS670B is the bare tool version of DeWalt's top-rated 60V MAX cordless chainsaw\./gi, 'The DEWALT DCCS670B is a bare-tool 60V MAX FLEXVOLT cordless chainsaw with a 16-inch bar and brushless motor.'],
  [/this is the best value way to get professional-grade cutting performance without paying for redundant batteries/gi, 'it lets compatible battery-platform users add the saw without purchasing another battery or charger'],
  [/Compatible with all 20V MAX, 60V MAX, and FLEXVOLT batteries/gi, 'Compatible with DEWALT 60V MAX FLEXVOLT batteries'],
  [/delivers the performance of a gas chainsaw with zero emissions and virtually zero maintenance/gi, 'provides cordless cutting without gasoline, exhaust, or fuel mixing'],
  [/dependable, American-built lawn tractor/gi, 'dependable gas lawn tractor'],
  [/revolutionary zero-turn electric riding mower/gi, 'battery-powered zero-turn riding mower'],
  [/dealer-free maintenance make this the future of lawn care/gi, 'reduced routine maintenance compared with a gasoline engine'],
  [/Voltage: 4x 56V \(effectively 224V combined\)/gi, 'Battery platform: EGO 56V ARC Lithium'],
  [/\n- Industry-leading 5-year tool and 3-year battery warranty/gi, ''],
  [/one of the most advanced cordless walk-behind mowers on the market/gi, 'a cordless walk-behind mower with a 22-inch aluminum deck'],
  [/Honda's flagship walk-behind lawn mower/gi, 'a self-propelled walk-behind lawn mower'],
  [/Powered by Honda's reliable 187cc GCV200 engine/gi, 'Powered by a Honda 187cc gasoline engine'],
  [/Honda GCV200 187cc OHV/gi, 'Honda 187cc OHV'],
  [/delivers unmatched performance season after season/gi, 'is designed for regular seasonal lawn care'],
  [/Honda's legendary GCV200 engine - easy start, low emissions, high reliability/gi, 'Honda 187cc engine for residential lawn care'],
  [/faster than any hand-held blower/gi, 'for high-volume clearing work'],
  [/one of the most trusted professional-grade chainsaws on the market/gi, 'a 60.3cc gas chainsaw designed for demanding property and wood-cutting work'],
  [/where reliability and raw power are non-negotiable/gi, 'where sustained cutting capacity is needed'],
  [/\n- Adjustable cutting head angle for versatile trimming positions/gi, ''],
  [/premium cordless backpack blower/gi, 'cordless handheld leaf blower'],
  [/Ergonomic backpack design with padded harness for all-day comfort/gi, 'Balanced handheld design for mobile clearing work'],
  [/for all-day comfort/gi, 'for extended use'],
  [/lightning-fast, precise maneuvering/gi, 'precise maneuvering'],
  [/around any obstacle/gi, 'around common landscape obstacles'],
  [/maximum durability and reliability/gi, 'durability during regular use'],
  [/maximum efficiency and runtime/gi, 'efficient cordless operation and runtime'],
  [/maximum cutting power/gi, 'high cutting output'],
  [/massive 32-inch bar/gi, '32-inch bar'],
  [/effortless mowing/gi, 'assisted mowing'],
  [/effortless pull-start ignition/gi, 'easier pull-start ignition'],
  [/effortless pull-cord starting/gi, 'easier pull-cord starting'],
];

function optimizeDescription(slug: string, source: string): string {
  let description = replacementDescriptions[slug] || source;
  for (const [pattern, value] of phraseReplacements) description = description.replace(pattern, value);
  return description.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

async function main() {
  const exportData = JSON.parse(await readFile(contentPath, 'utf8')) as ProductContentExport;
  const databaseSlugs = new Set(exportData.products.map((product) => product.slug));
  const missing = exportData.products.filter((product) => !optimizedTitles[product.slug]);
  const unknown = Object.keys(optimizedTitles).filter((slug) => !databaseSlugs.has(slug));

  if (exportData.products.length !== 25 || missing.length || unknown.length) {
    throw new Error(`Expected the 25-product Cokaro catalog. Found ${exportData.products.length}; missing: ${missing.map((p) => p.slug).join(', ') || 'none'}; unknown: ${unknown.join(', ') || 'none'}.`);
  }

  let updated = 0;
  exportData.products = exportData.products.map((product) => {
    const next = { ...product, title: optimizedTitles[product.slug], description: optimizeDescription(product.slug, product.description) };
    updated += Number(next.title !== product.title || next.description !== product.description);
    return next;
  });

  await writeFile(contentPath, `${JSON.stringify(exportData, null, 2)}\n`, 'utf8');
  console.log(`Optimized ${updated} of ${exportData.products.length} Cokaro products.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
