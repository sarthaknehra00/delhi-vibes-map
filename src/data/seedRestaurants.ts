import { Restaurant } from '@/stores/foodStore';

let id = 1;
const r = (name: string, hotspotId: string, category: Restaurant['category'], votes: number, description: string, addedBy: string): Restaurant => ({
  id: String(id++), name, hotspotId, category, votes, description, addedBy
});

export const SEED_RESTAURANTS: Restaurant[] = [
  // Connaught Place
  r('Wenger\'s Bakery', 'cp', 'Cafes', 2800, 'Since 1926. Patties and pastries that outlived the British.', 'OldDelhiVibes'),
  r('Kwality Restaurant', 'cp', 'Fine Dining', 2200, 'Old-world charm. Butter chicken that has seen independence.', 'FoodHistorian'),
  r('Saravana Bhavan', 'cp', 'Street Food', 1900, 'South Indian in the heart of North India. Dosa diplomacy.', 'IdliGang'),
  r('The Big Chill', 'cp', 'Cafes', 3100, 'Pasta, desserts, and a 2-hour wait. Always worth it.', 'CPRegular'),
  r('Dhaba Estd 1986', 'cp', 'Fine Dining', 1700, 'Punjabi food in fancy plates. Nostalgia tax included.', 'ButtaChicken'),

  // Chandni Chowk
  r('Paranthe Wali Gali', 'chandnichowk', 'Street Food', 4500, 'Parathas stuffed with everything including your expectations.', 'StreetFoodKing'),
  r('Natraj Dahi Bhalla', 'chandnichowk', 'Street Food', 3800, 'Soft dahi bhallas that melt before reaching your stomach.', 'ChaatLover'),
  r('Old Famous Jalebi Wala', 'chandnichowk', 'Street Food', 4200, 'Hot jalebis in desi ghee since 1884. Diabetes can wait.', 'MithaiManiac'),
  r('Kuremal Kulfi', 'chandnichowk', 'Street Food', 3500, 'Mango stuffed kulfi. Seasonal but life-changing.', 'KulfiConnoisseur'),
  r('Al Jawahar', 'chandnichowk', 'Fine Dining', 2900, 'Mughlai royalty opposite Jama Masjid. Nihari at 6 AM.', 'MughlaiMaster'),

  // Karol Bagh
  r('Roshan Di Kulfi', 'karolbagh', 'Street Food', 3200, 'Kulfi Falooda legacy. The OG since forever.', 'KBLocal'),
  r('Changezi Chicken', 'karolbagh', 'Street Food', 2800, 'Butter chicken that makes you forget diet plans exist.', 'NonVegNinja'),
  r('Om Corner Chole Bhature', 'karolbagh', 'Street Food', 2500, '30+ years of perfectly spiced chole. Morning ritual.', 'BhatureBoss'),
  r('Sindhi Corner', 'karolbagh', 'Street Food', 2100, 'Heart-shaped tikkis and pure desi vibes.', 'TikkiTales'),
  r('Suruchi Restaurant', 'karolbagh', 'Fine Dining', 1800, 'Gujarati-Rajasthani thali. All-you-can-eat guilt.', 'ThaliLover'),

  // Rajinder Nagar
  r('Baba Nagpal Corner', 'rajindernagar', 'Street Food', 2600, 'Chole kulche that UPSC aspirants swear by.', 'UPSCFoodie'),
  r('Dolma Aunty Momos', 'rajindernagar', 'Street Food', 2200, 'Legendary momos. The aunty is the brand.', 'MomoMaster'),
  r('Rajinder Da Dhaba', 'rajindernagar', 'Street Food', 1900, 'Kebabs and tikkas on a roadside. Pure magic.', 'DhabaDon'),
  r('Prince Paan Corner', 'rajindernagar', 'Street Food', 1500, 'Fire paan and meetha paan. Instagram-worthy.', 'PaanLover'),
  r('Shankar Samosa', 'rajindernagar', 'Street Food', 1700, 'Samosas bigger than your ambitions.', 'SamosaKing'),

  // Patel Nagar
  r('Sita Ram Diwan Chand', 'patelnagar', 'Street Food', 3500, 'Chole bhature so famous even Google knows.', 'CholeBhatureOG'),
  r('Chauhan Parantha', 'patelnagar', 'Street Food', 2000, 'Stuffed paranthas with unlimited butter.', 'ParanthaLover'),
  r('Bikaner Sweet Corner', 'patelnagar', 'Street Food', 1600, 'Samosa chaat + sweet lassi = heaven.', 'SweetTooth'),
  r('Shyam Momos', 'patelnagar', 'Street Food', 1400, 'Steamed perfection. No-frills momo stall.', 'MomoFan'),
  r('Patel Nagar Chaat Bhandar', 'patelnagar', 'Street Food', 1200, 'Papdi chaat with the spice of life.', 'ChaatChamp'),

  // Chanakyapuri
  r('Bukhara - ITC Maurya', 'chanakyapuri', 'Fine Dining', 4000, 'Dal Bukhara. Presidents have eaten here. So can you, for a price.', 'LuxuryDiner'),
  r('Dum Pukht - ITC Maurya', 'chanakyapuri', 'Fine Dining', 3500, 'Slow-cooked Awadhi royalty. Book 2 weeks ahead.', 'FineDineKing'),
  r('Daniell\'s Tavern', 'chanakyapuri', 'Cafes', 2200, 'Colonial vibes, modern cocktails. Brunch heaven.', 'BrunchClub'),
  r('Masala Art - Taj Palace', 'chanakyapuri', 'Fine Dining', 2800, 'North Indian art on a plate. Buffet worth the splurge.', 'TajFoodie'),
  r('The Claridges', 'chanakyapuri', 'Fine Dining', 2000, 'Old money energy. Afternoon tea is chef\'s kiss.', 'HeritageDiner'),

  // Hauz Khas
  r('Naivedyam', 'hauzkhas', 'Fine Dining', 2400, 'South Indian in HKV. Filter coffee that heals souls.', 'CoffeeCult'),
  r('Bombay Bhelpuri', 'hauzkhas', 'Street Food', 1800, 'Mumbai street food transplant. Pav bhaji SLAPS.', 'BhelLover'),
  r('Yeti - The Himalayan Kitchen', 'hauzkhas', 'Cafes', 2100, 'Thukpa and momos from the mountains. Cozy AF.', 'HimalayanFoodie'),
  r('Kunzum Travel Cafe', 'hauzkhas', 'Cafes', 1500, 'Pay what you want. Books and coffee for free spirits.', 'CafeHopper'),
  r('Mia Bella', 'hauzkhas', 'Cafes', 1900, 'Italian with a view of the ruins. Date night approved.', 'DateNightDelhi'),

  // Saket
  r('Nando\'s Select Citywalk', 'saket', 'Cafes', 1800, 'Peri-peri chicken. Mall food done right.', 'MallRat'),
  r('Yum Yum Cha', 'saket', 'Fine Dining', 2200, 'Dim sum and bao buns. Instagram before eating.', 'DimSumDiva'),
  r('Sattvik', 'saket', 'Fine Dining', 1600, 'Pure veg fine dining. Temple food made fancy.', 'VegElite'),
  r('Johnny Rockets', 'saket', 'Cafes', 1400, 'American diner vibes. Milkshakes thick as friendship.', 'ShakeAddict'),
  r('Cafe Delhi Heights', 'saket', 'Cafes', 2000, 'All-day breakfast and massive portions.', 'BrunchLover'),

  // Lajpat Nagar
  r('Dolma Aunty Momos', 'lajpatnagar', 'Street Food', 3000, 'The OG momos. Worth the queue, always.', 'MomoDevotee'),
  r('Ram Laddu Corner', 'lajpatnagar', 'Street Food', 2200, 'Crunchy laddoos with mooli chutney. 10 rupees ka therapy.', 'StreetSnacker'),
  r('Jhakkas Pav Bhaji', 'lajpatnagar', 'Street Food', 1900, 'Mumbai-style pav bhaji with extra butter. Always.', 'PavBhajiPro'),
  r('Amar Colony Chaat', 'lajpatnagar', 'Street Food', 2500, 'Evening chaat walk. Aloo tikki supremacy.', 'ChaatWalker'),
  r('Lajpat Nagar Kulfi Wala', 'lajpatnagar', 'Street Food', 1500, 'Matka kulfi that takes you to your childhood.', 'KulfiKid'),

  // Sarojini Nagar
  r('Durga Chole Bhature', 'sarojininagar', 'Street Food', 2600, 'After shopping fuel. Spicy chole, fluffy bhature.', 'ShopperFoodie'),
  r('Dolma Aunty Momos', 'sarojininagar', 'Street Food', 2200, 'Yes, she is everywhere. And everywhere she is legendary.', 'MomoTracker'),
  r('Kulcha King', 'sarojininagar', 'Street Food', 1800, 'Tandoori kulchas. Paneer one is the GOAT.', 'KulchaFan'),
  r('Khandani Pakoras', 'sarojininagar', 'Street Food', 1500, 'Rain or shine, pakoras always win.', 'PakoraLover'),
  r('Shahi Dahi Bhalle', 'sarojininagar', 'Street Food', 1700, 'Dahi bhalle so good you forget the shopping bill.', 'DahiBhalleKing'),

  // Vasant Kunj
  r('Social - Vasant Kunj', 'vasantkunj', 'Cafes', 1800, 'Co-working meets cocktails. Laptop + beer culture.', 'SocialButterfly'),
  r('Sushi House Mafia', 'vasantkunj', 'Fine Dining', 1500, 'Japanese food in DLF Promenade. Fresh rolls.', 'SushiSnob'),
  r('Chili\'s', 'vasantkunj', 'Cafes', 1400, 'Tex-Mex comfort food. Baby back ribs FTW.', 'RibsLover'),
  r('Pizza Hut Ambience', 'vasantkunj', 'Cafes', 1200, 'Stuffed crust nostalgia. Mall food classic.', 'PizzaKid'),
  r('Haldiram\'s', 'vasantkunj', 'Street Food', 1600, 'Chaat counter saves every mall trip.', 'ChaatSaver'),

  // Green Park
  r('Evergreen Sweet Shop', 'greenpark', 'Street Food', 2800, 'Chaat and sweets since decades. The real OG.', 'EvergreenFan'),
  r('Elma\'s Bakery', 'greenpark', 'Cafes', 2000, 'European patisserie vibes. Croissants worth the trip.', 'BakeryLover'),
  r('SodaBottleOpenerWala', 'greenpark', 'Cafes', 1700, 'Parsi food with quirky decor. Berry pulao is divine.', 'ParsiFoodie'),
  r('Carnatic Cafe', 'greenpark', 'Cafes', 1500, 'Filter coffee and dosas in Aurobindo Market.', 'DosaDaily'),
  r('Big Yellow Door', 'greenpark', 'Cafes', 1900, 'Student cafe legend. Pasta and milkshakes.', 'DUStudent'),

  // Malviya Nagar
  r('QD\'s Restaurant', 'malviya', 'Street Food', 1800, 'Late night kebabs and rolls. Post-party savior.', 'NightOwlEats'),
  r('The Nut House', 'malviya', 'Cafes', 1400, 'Dry fruits and health food. Guilt-free snacking.', 'HealthNut'),
  r('Momos Point Malviya', 'malviya', 'Street Food', 1200, 'Every gali has one. This one is the best.', 'GaliMomos'),
  r('Baba Ka Dhaba', 'malviya', 'Street Food', 1600, 'Viral fame but genuinely good dal.', 'ViralFoodie'),
  r('Chowringhee', 'malviya', 'Cafes', 1500, 'Bengali food in South Delhi. Fish curry hits different.', 'BengaliBites'),

  // Nehru Place
  r('United Coffee House Rewind', 'nehruplace', 'Cafes', 1600, 'Coffee and code. Developer lunch spot.', 'TechBro'),
  r('BTW - By The Way', 'nehruplace', 'Street Food', 1400, 'Quick bites between laptop shopping.', 'GadgetFoodie'),
  r('Subway Nehru Place', 'nehruplace', 'Cafes', 1000, 'The only healthy option in a sea of chips.', 'SubwayRegular'),
  r('South Indian Corner', 'nehruplace', 'Street Food', 1200, 'Idli-sambar between motherboard purchases.', 'TechEater'),
  r('Haldiram\'s Nehru Place', 'nehruplace', 'Street Food', 1500, 'Reliable chaat after a long haggling session.', 'HagglerFoodie'),

  // Greater Kailash
  r('Uncle\'s Kitchen', 'greaterkailash', 'Street Food', 2200, 'M Block Market legend. Rolls and kebabs.', 'GKSnob'),
  r('Big Chill Cafe', 'greaterkailash', 'Cafes', 2800, 'The original location. Pasta and cakes worth killing for.', 'BigChillOG'),
  r('Cafe Turtle', 'greaterkailash', 'Cafes', 1800, 'Bookstore cafe. Cheesecake and literature.', 'BookwormEater'),
  r('Di Ghent Cafe', 'greaterkailash', 'Cafes', 1600, 'Belgian waffles in GK. Weekend brunch staple.', 'WaffleLover'),
  r('Bikanervala GK', 'greaterkailash', 'Street Food', 1400, 'South Indian + North Indian. All bases covered.', 'BikanerFan'),

  // Defence Colony
  r('Def Col Street Food Market', 'defcol', 'Street Food', 2400, 'Evening food walk. Every stall is a winner.', 'DefColLocal'),
  r('SodaBottleOpenerWala', 'defcol', 'Cafes', 2000, 'Irani chai and bun maska. Bombay in Delhi.', 'BombayMiss'),
  r('Aslam\'s Butter Chicken', 'defcol', 'Street Food', 1800, 'Butter chicken that needs no introduction.', 'ButterChickenKing'),
  r('Gulati Restaurant', 'defcol', 'Fine Dining', 2200, 'Pandara Road institution. Government babus\' canteen.', 'BabuFoodie'),
  r('Pind Balluchi', 'defcol', 'Fine Dining', 1500, 'Punjabi dhaba meets restaurant. Dal makhani heaven.', 'DalMakhaniLover'),

  // Kalkaji
  r('Kalkaji Devi Mandir Chaat', 'kalkaji', 'Street Food', 2000, 'Prasad + chaat combo. Temple visit essential.', 'DevoteFoodie'),
  r('Baba Kharak Singh Marg', 'kalkaji', 'Street Food', 1500, 'Government canteens serving state food. Hidden gem.', 'GovtCanteenFan'),
  r('Haldiram\'s Kalkaji', 'kalkaji', 'Street Food', 1400, 'Reliable snacks near Nehru Place.', 'SnackAttack'),
  r('Monginis Kalkaji', 'kalkaji', 'Cafes', 1000, 'Birthday cakes and pastries. Childhood memories.', 'CakeLover'),
  r('South Indian Express', 'kalkaji', 'Street Food', 1200, 'Quick dosa near the temple. Efficient.', 'DosaExpress'),

  // Dwarka
  r('Gomti Restaurant', 'dwarka', 'Fine Dining', 2200, 'Best veg food in Dwarka. No debate.', 'DwarkaFoodie'),
  r('Haldiram\'s Dwarka', 'dwarka', 'Street Food', 1800, 'Chaat, sweets, snacks. The Dwarka staple.', 'SectorHopper'),
  r('Charmi Restaurant', 'dwarka', 'Fine Dining', 1500, 'Family dinner spot. Punjabi-Chinese fusion.', 'FamilyDiner'),
  r('Om Sweets & Snacks', 'dwarka', 'Street Food', 1600, 'Sweet boxes and namkeen. Festive essential.', 'FestiveFoodie'),
  r('Domino\'s Sec 12', 'dwarka', 'Cafes', 1200, 'Pizza delivery capital of Dwarka sectors.', 'LazyEater'),

  // Uttam Nagar
  r('Uttam Corner Chole Bhature', 'uttamnagar', 'Street Food', 1800, 'Morning fuel for the working class.', 'UttamLocal'),
  r('Garg Chaat Bhandar', 'uttamnagar', 'Street Food', 1500, 'Papdi chaat with extra sev. Always.', 'ChaatFanatic'),
  r('Metro Momos', 'uttamnagar', 'Street Food', 1200, 'Right outside metro. Quick momo fix.', 'MetroMomo'),
  r('Sharma Ji Parathe', 'uttamnagar', 'Street Food', 1400, 'Aloo paratha with white butter. Desi breakfast.', 'ParathaDaily'),
  r('Bikanervala Uttam Nagar', 'uttamnagar', 'Street Food', 1100, 'All-purpose snack shop. Reliable.', 'SnackReliable'),

  // Janakpuri
  r('District Centre Food Court', 'janakpuri', 'Cafes', 1600, 'Multiple options under one roof.', 'JanakpuriFan'),
  r('Chole Bhature Corner', 'janakpuri', 'Street Food', 1400, 'Morning queue = quality guaranteed.', 'MorningFoodie'),
  r('Unity One Food Court', 'janakpuri', 'Cafes', 1200, 'Mall food variety. Weekend family choice.', 'MallDiner'),
  r('Naan Point', 'janakpuri', 'Street Food', 1300, 'Tandoori naan with any sabzi. Simple joy.', 'NaanLover'),
  r('Rajma Chawal Stall', 'janakpuri', 'Street Food', 1500, 'Comfort food personified.', 'RajmaRice'),

  // Rajouri Garden
  r('Bittoo Tikki Wala', 'rajouri', 'Street Food', 3000, 'Aloo tikki with all the chutneys. Iconic.', 'TikkiLegend'),
  r('Prem Di Hatti', 'rajouri', 'Street Food', 2500, 'Chole Bhature institution. 40+ years strong.', 'RajouriOG'),
  r('A.K. Mot Kachori', 'rajouri', 'Street Food', 2000, 'Crunchy kachori with spiced dal. Unique find.', 'KachoriKing'),
  r('Hunger Strike', 'rajouri', 'Street Food', 1800, 'Tandoori momos that changed the game.', 'TandooriMomoFan'),
  r('Atul Chaat Corner', 'rajouri', 'Street Food', 1600, 'Chaat variety that overwhelms in the best way.', 'ChaatOverload'),

  // Tilak Nagar
  r('Tilak Nagar Chaat Market', 'tilak', 'Street Food', 1800, 'Evening chaat stalls. Every flavour available.', 'TilakLocal'),
  r('Gupta Ji Chole Bhature', 'tilak', 'Street Food', 1500, 'Early morning queue tells the story.', 'BhatureQueueGuy'),
  r('Sharma Sweets', 'tilak', 'Street Food', 1200, 'Jalebis and gulab jamun. Traditional.', 'MithaiLover'),
  r('Lucky Momos', 'tilak', 'Street Food', 1100, 'Steamed and fried. Student prices.', 'BudgetMomo'),
  r('Punjabi Tadka Dhaba', 'tilak', 'Street Food', 1400, 'Dhaba food in the market. Raw and real.', 'DhabaLover'),

  // Palam
  r('Highway Dhaba', 'palam', 'Street Food', 1400, 'Truck-stop vibes. Authentic dal-roti.', 'HighwayFoodie'),
  r('Palam Colony Chaat', 'palam', 'Street Food', 1200, 'Local chaat stalls. Hidden from tourists.', 'LocalOnly'),
  r('Sagar Ratna Palam', 'palam', 'Cafes', 1100, 'South Indian chain but consistently good.', 'DosaChain'),
  r('Bikaner Sweets Palam', 'palam', 'Street Food', 1000, 'Snacks and sweets hub. Festival essential.', 'SweetSpot'),
  r('Kebab Corner', 'palam', 'Street Food', 1300, 'Late night seekh kebabs. Worth the detour.', 'KebabNight'),

  // Vikas Puri
  r('Vikas Puri Market Chaat', 'vikaspuri', 'Street Food', 1500, 'Evening chaat walk destination.', 'VikasPuriLocal'),
  r('Paratha Junction', 'vikaspuri', 'Street Food', 1300, 'Multi-filling parathas. Breakfast done right.', 'ParathaJunction'),
  r('Momos Hub VP', 'vikaspuri', 'Street Food', 1100, 'Affordable momos. Student paradise.', 'VPStudent'),
  r('Bikanervala VP', 'vikaspuri', 'Street Food', 1200, 'Safe choice for family outings.', 'FamilyChoice'),
  r('King Kulfi', 'vikaspuri', 'Street Food', 1000, 'Summer essential. Matka kulfi rules.', 'SummerCool'),

  // Punjabi Bagh
  r('Club Road Food Street', 'punjabibagh', 'Street Food', 2400, 'Food gali with everything. Walk and eat.', 'ClubRoadFoodie'),
  r('Bikanervala Punjabi Bagh', 'punjabibagh', 'Street Food', 1800, 'Flagship outlet. Chaat counter is legendary.', 'BikanerLoyalist'),
  r('Ring Road Tikki Stall', 'punjabibagh', 'Street Food', 1500, 'Roadside tikki. Risk it for the taste.', 'RoadTikki'),
  r('Cafe Coffee Day PB', 'punjabibagh', 'Cafes', 1200, 'After-dinner coffee spot.', 'CoffeeLover'),
  r('Punjabi Bagh Kebab Point', 'punjabibagh', 'Street Food', 1600, 'Evening kebabs. Smoky perfection.', 'KebabConnoisseur'),

  // Paschim Vihar
  r('Paschim Vihar Market Food', 'paschimvihar', 'Street Food', 1400, 'Local market chaat. Authentic flavours.', 'PVLocal'),
  r('Rajma Chawal Corner PV', 'paschimvihar', 'Street Food', 1200, 'Comfort food by the kilo.', 'RajmaAddict'),
  r('Sharma Ji Sweets', 'paschimvihar', 'Street Food', 1100, 'Samosa and jalebi combo. Classic.', 'ClassicCombo'),
  r('Chinese Fast Food PV', 'paschimvihar', 'Street Food', 1000, 'Manchurian and fried rice. Desi Chinese.', 'DesiChineseFan'),
  r('Chole Bhature House', 'paschimvihar', 'Street Food', 1300, 'Morning staple. No questions asked.', 'MorningChole'),

  // Laxmi Nagar
  r('Shri Ganesh Chole Bhature', 'laxminagar', 'Street Food', 2800, 'Student area legend. Bhature bigger than plates.', 'LNStudent'),
  r('Bobby Tikki Wala', 'laxminagar', 'Street Food', 2200, 'Budget tikki. Taste exceeds the price.', 'BudgetKing'),
  r('Haldiram\'s Laxmi Nagar', 'laxminagar', 'Street Food', 1800, 'Reliable family option. Chaat + dinner.', 'FamilyLN'),
  r('Shiv Chaat Bhandar', 'laxminagar', 'Street Food', 1600, 'Golgappas with 6 flavour pani. Legend.', 'GolgappaGuru'),
  r('Ramji Samose Wale', 'laxminagar', 'Street Food', 2000, 'Pizza samosa exists here. Mind = blown.', 'SamosaInnovator'),

  // Mayur Vihar
  r('Rolls Hub', 'mayurvihar', 'Street Food', 2000, '65+ roll varieties. Decision paralysis guaranteed.', 'RollMaster'),
  r('Momos Hut', 'mayurvihar', 'Street Food', 1700, 'Steamed and fried. Chili garlic chutney is fire.', 'MomoHutFan'),
  r('Rajendra Pav Bhaji', 'mayurvihar', 'Street Food', 1500, 'Mumbai pav bhaji in East Delhi. Legit.', 'PavBhajiEast'),
  r('Chauhan Namkeen', 'mayurvihar', 'Street Food', 1300, 'Fresh samosas and kachoris. Hot from oil.', 'FreshFried'),
  r('Aggarwal Chole Bhature', 'mayurvihar', 'Street Food', 1800, 'Filling and tasty. Post-metro fuel.', 'MetroFuel'),

  // Preet Vihar
  r('Preet Vihar Market Chaat', 'preetvihar', 'Street Food', 1600, 'Evening food walk essential.', 'PreetViharLocal'),
  r('Bikaner Chaat Corner', 'preetvihar', 'Street Food', 1400, 'Papdi chaat perfection. Sweet and tangy.', 'PapdiPro'),
  r('Chinese Van PV', 'preetvihar', 'Street Food', 1200, 'Roadside Chinese. Honey chilli potato OG.', 'HCPFan'),
  r('V2 Food Court', 'preetvihar', 'Cafes', 1100, 'After-shopping food options.', 'MallEater'),
  r('Giani Di Hatti PV', 'preetvihar', 'Street Food', 1500, 'Rabri falooda and kulfi. Cool down spot.', 'CoolDownKing'),

  // Vivek Vihar
  r('VV Phase 1 Market Food', 'vivekvihar', 'Street Food', 1400, 'Local market gems. Ask the neighbours.', 'VVLocal'),
  r('Momo Corner VV', 'vivekvihar', 'Street Food', 1200, 'Tandoori momos. Hidden gem territory.', 'HiddenMomo'),
  r('Sharma Chole Bhature', 'vivekvihar', 'Street Food', 1100, 'Morning classic. Generations of taste.', 'GenerationTaste'),
  r('Sweet Centre VV', 'vivekvihar', 'Street Food', 1000, 'Gulab jamun and rasgulla. Festival must.', 'FestivalSweet'),
  r('South Indian Dosa VV', 'vivekvihar', 'Street Food', 900, 'Paper dosa in East Delhi. Surprisingly good.', 'DosaSurprise'),

  // Shahdara
  r('Chawla\'s 2 Since 1960', 'shahdara', 'Street Food', 2600, 'Chicken since 1960. Heritage non-veg.', 'HeritageEater'),
  r('Bikanervala Shahdara', 'shahdara', 'Street Food', 1800, 'Multi-cuisine Indian. Always dependable.', 'ShahdaLocal'),
  r('Barbeque Nation Shahdara', 'shahdara', 'Fine Dining', 1500, 'Unlimited grills. Birthday celebration staple.', 'BBQFan'),
  r('Nathu\'s Sweets', 'shahdara', 'Street Food', 1600, 'Chaat and mithai. East Delhi institution.', 'NathuFan'),
  r('Shahdara Kebab Lane', 'shahdara', 'Street Food', 2000, 'Evening kebab stalls. Smoky and spicy.', 'KebabLane'),

  // Ghazipur
  r('Ghazipur Flower Market Chai', 'ghazipur', 'Street Food', 1200, 'Best chai among flowers at 5 AM.', 'EarlyRiser'),
  r('Highway Dhaba Ghazipur', 'ghazipur', 'Street Food', 1100, 'Trucker food. Real dal and roti.', 'TruckerFood'),
  r('Tikka Junction', 'ghazipur', 'Street Food', 1000, 'Evening chicken tikka. Worth the drive.', 'TikkaDrive'),
  r('Ghazipur Samosa Hub', 'ghazipur', 'Street Food', 900, 'Giant samosas. Budget-friendly.', 'GiantSamosa'),
  r('Tea Stall near Mandi', 'ghazipur', 'Street Food', 800, 'Kadak chai with bun maska. Simplicity.', 'ChaiLover'),

  // Anand Vihar
  r('ISBT Food Stalls', 'anandvihar', 'Street Food', 1800, 'Pre-bus chai and samosa. Travel ritual.', 'BusTraveller'),
  r('Anand Vihar Market Chaat', 'anandvihar', 'Street Food', 1400, 'Local chaat market. Evening crowd favourite.', 'AVLocal'),
  r('Kamal Sweets', 'anandvihar', 'Street Food', 1200, 'Jalebis and gulab jamun. Traditional.', 'JalebiJunkie'),
  r('Chole Kulche Point AV', 'anandvihar', 'Street Food', 1500, 'Morning fuel before the bus journey.', 'PreBusFuel'),
  r('Chinese Corner AV', 'anandvihar', 'Street Food', 1100, 'Chowmein and momos. Student budget.', 'StudentBudget'),

  // Yamuna Vihar
  r('Yamuna Vihar Market Food', 'yamunavihar', 'Street Food', 1300, 'Authentic local food territory.', 'YVFoodie'),
  r('Kebab Paradise YV', 'yamunavihar', 'Street Food', 1100, 'Evening seekh kebabs. Local favourite.', 'KebabLocal'),
  r('Sharma Ji Sweets YV', 'yamunavihar', 'Street Food', 1000, 'Samosa and jalebi. Always fresh.', 'AlwaysFresh'),
  r('Biryani Point YV', 'yamunavihar', 'Street Food', 1200, 'Affordable biryani. Generous portions.', 'BiryaniBudget'),
  r('Chai & Paratha Corner', 'yamunavihar', 'Street Food', 900, 'Roadside breakfast. Aloo paratha love.', 'RoadsideBreakfast'),

  // Dilshad Garden
  r('Dilshad Garden Market Chaat', 'dilshadgarden', 'Street Food', 1500, 'Market chaat stalls. Evening must.', 'DGLocal'),
  r('Momos Express DG', 'dilshadgarden', 'Street Food', 1200, 'Quick momos near metro. Convenient.', 'MetroMomos'),
  r('Raja Chole Bhature', 'dilshadgarden', 'Street Food', 1400, 'Morning chole bhature. East Delhi style.', 'EastDelhiBreakfast'),
  r('Bikaner Corner DG', 'dilshadgarden', 'Street Food', 1100, 'Samosa chaat combo. Reliable.', 'ComboKing'),
  r('Night Kebab Stall DG', 'dilshadgarden', 'Street Food', 1300, 'Post-10 PM seekh kebabs. Night owls only.', 'NightKebab'),

  // IP Extension
  r('Patparganj Market Food', 'ipext', 'Street Food', 1500, 'Local market food stalls. Hidden variety.', 'IPELocal'),
  r('Momos Hub IP', 'ipext', 'Street Food', 1200, 'Tandoori and steamed. Both equally good.', 'BothMomos'),
  r('South Indian Corner IP', 'ipext', 'Street Food', 1100, 'Dosa and uttapam. Quick lunch.', 'QuickLunch'),
  r('IP Extension Chaat Walk', 'ipext', 'Street Food', 1400, 'Evening golgappa and tikki trail.', 'ChaatTrail'),
  r('Sharma Chole Kulche IP', 'ipext', 'Street Food', 1300, 'Kulche so soft they melt.', 'KulcheMelt'),

  // Civil Lines
  r('The Oberoi Maiden\'s', 'civillines', 'Fine Dining', 2500, 'Heritage hotel dining. Brunch in colonial splendor.', 'HeritageGourmet'),
  r('Chor Bizarre', 'civillines', 'Fine Dining', 2200, 'Kashmiri-Mughlai in antique decor. Rogan josh divine.', 'KashmirInDelhi'),
  r('Gulshan Dhaba', 'civillines', 'Street Food', 1800, 'Famous keema and naan. Midnight food run.', 'MidnightRun'),
  r('DU North Campus Food', 'civillines', 'Street Food', 2000, 'Tom Uncle\'s Maggi Point and Sudama chaat.', 'DUFoodie'),
  r('Civil Lines Chaat Corner', 'civillines', 'Street Food', 1500, 'Old Delhi style chaat near Kashmere Gate.', 'OldDelhiChaat'),

  // Model Town
  r('Model Town Market Food', 'modeltown', 'Street Food', 1600, 'Local eateries with home-style cooking.', 'MTLocal'),
  r('Bikanervala Model Town', 'modeltown', 'Street Food', 1400, 'Family outing favourite.', 'MTFamily'),
  r('Chinese Hut MT', 'modeltown', 'Street Food', 1200, 'Desi Chinese. Manchurian overload.', 'ManchurianMad'),
  r('Chole Bhature Stall MT', 'modeltown', 'Street Food', 1300, 'Early morning. Queue before 8 AM.', 'EarlyBird'),
  r('MT Park Kulfi Wala', 'modeltown', 'Street Food', 1100, 'Park-side kulfi. Summer ritual.', 'ParkKulfi'),

  // GT Road Area
  r('Moti Mahal Delux', 'gtbroad', 'Fine Dining', 2800, 'Invented butter chicken. THE restaurant.', 'ButterChickenOG'),
  r('Karim\'s', 'gtbroad', 'Fine Dining', 3200, 'Since 1913. Mughlai royalty near Jama Masjid.', 'KarimsForever'),
  r('Aslam Chicken Corner', 'gtbroad', 'Street Food', 2500, 'Butter garlic chicken that haunts your dreams.', 'AslamAddict'),
  r('GT Road Paratha Stalls', 'gtbroad', 'Street Food', 1800, 'Highway parathas. Butter-soaked perfection.', 'HighwayParatha'),
  r('Haji Shabrati Nihari Wale', 'gtbroad', 'Street Food', 2200, 'Nihari since 1857. Pre-Mutiny recipes.', 'NihariNerd'),

  // Pitampura
  r('Billu De Pakode', 'pitampura', 'Street Food', 1800, 'Pakoda institution. Rain = mandatory visit.', 'PakodaInRain'),
  r('Sardar Ji Jeep Wale', 'pitampura', 'Street Food', 1600, 'Famous North Delhi chaat from a jeep. Legend.', 'JeepChaat'),
  r('Momo Special Pitampura', 'pitampura', 'Street Food', 1400, 'Generous portions. Student pricing.', 'BigMomo'),
  r('Sharma Chole Bhature', 'pitampura', 'Street Food', 1300, 'NSP area breakfast. Queue-worthy.', 'NSPBreakfast'),
  r('Kaleva Restaurant', 'pitampura', 'Cafes', 1500, 'North Indian and Chinese. Family dinner.', 'FamilyDinnerNorth'),

  // Rohini
  r('Chalte Firte Momos', 'rohini', 'Street Food', 2000, 'Tandoori momos — Afghani, Achari, Kadhai styles.', 'MomoVariety'),
  r('Biji De Chole Bhature', 'rohini', 'Street Food', 1800, 'Morning chole. Rohini OG spot.', 'RohiniMorning'),
  r('Standard Rabri Faluda', 'rohini', 'Street Food', 1500, 'Kulfi falooda in Sector 8. Summer essential.', 'FaludaFan'),
  r('Ropar Punjabi Dhaba', 'rohini', 'Street Food', 1600, 'Desi ghee rajma chawal. Soul food.', 'SoulFood'),
  r('Have More Chinese Van', 'rohini', 'Street Food', 1400, 'Honey chilli potato from a van. Trust the van.', 'VanFood'),

  // Shalimar Bagh
  r('Ring Road Chaat Stalls', 'shalimarbagh', 'Street Food', 1500, 'Evening chaat along Ring Road.', 'RingRoadChaat'),
  r('Bikanervala SB', 'shalimarbagh', 'Street Food', 1300, 'Branch of the empire. Reliable.', 'BikanerEmpire'),
  r('Chinese Dragon SB', 'shalimarbagh', 'Street Food', 1100, 'Desi Chinese. Schezwan everything.', 'SchezwanLover'),
  r('Kebab & Rolls SB', 'shalimarbagh', 'Street Food', 1200, 'Hot rolls after gym. Protein excuse.', 'GymRoll'),
  r('Amritsari Kulcha SB', 'shalimarbagh', 'Street Food', 1400, 'Stuffed kulcha with chole. Amritsari legit.', 'KulchaAmritsari'),

  // Ashok Vihar
  r('Ashok Vihar Phase 1 Market', 'ashokvihar', 'Street Food', 1500, 'Local market food. Ask auntie for recommendations.', 'AskAuntie'),
  r('Chole Bhature AV', 'ashokvihar', 'Street Food', 1300, 'Every North Delhi area has THE chole bhature. This is it.', 'NorthDelhiChole'),
  r('Momos & More AV', 'ashokvihar', 'Street Food', 1100, 'Tandoori and kurkure momos. Innovation central.', 'KurkureMomo'),
  r('Gupta Ji Chaat', 'ashokvihar', 'Street Food', 1200, 'Dahi bhalla and golgappe. Old-school.', 'OldSchoolChaat'),
  r('Sweet Corner AV', 'ashokvihar', 'Street Food', 1000, 'Freshly made jalebis every evening.', 'EveningJalebi'),

  // Noida
  r('Desi Vibes', 'noida', 'Fine Dining', 2500, 'Village-themed restaurant. Dal bati churma in AC.', 'NoidaFoodie'),
  r('Burma Burma', 'noida', 'Fine Dining', 2200, 'Burmese vegetarian. Khow suey is divine.', 'BurmeseLover'),
  r('Barbeque Nation Noida', 'noida', 'Fine Dining', 1800, 'Unlimited grills. Every table a party.', 'BBQParty'),
  r('The Beer Garden', 'noida', 'Cafes', 2000, 'Sector 63 hangout. Drinks and grilled platters.', 'Sec63Chiller'),
  r('Bikanervala Noida', 'noida', 'Street Food', 1600, 'Reliable Indian snacks in IT park territory.', 'ITParkSnack'),

  // Gurgaon
  r('Cyber Hub Food Court', 'gurgaon', 'Cafes', 2800, 'Corporate lunch spot turned weekend hangout.', 'CyberHubReg'),
  r('Farzi Cafe', 'gurgaon', 'Fine Dining', 2400, 'Molecular gastronomy meets Indian. Mind-bending.', 'FarziFan'),
  r('SodaBottleOpenerWala GGN', 'gurgaon', 'Cafes', 1800, 'Parsi food chain but always delivers.', 'ParsiGGN'),
  r('Heroes Dhaba', 'gurgaon', 'Street Food', 1500, 'Dhaba on MG Road. Unlikely but great.', 'DhabaOnMG'),
  r('Old Town Cafe', 'gurgaon', 'Cafes', 1600, 'Sector 29 classic. Beer and butter chicken.', 'Sec29Night'),

  // Faridabad
  r('Crown Mall Food Court', 'faridabad', 'Cafes', 1400, 'Only mall = all food here.', 'FBDLocal'),
  r('Bikaner Chaat Corner FBD', 'faridabad', 'Street Food', 1200, 'Chaat stalls near the market.', 'FBDChaat'),
  r('Sector 15 Market Food', 'faridabad', 'Street Food', 1300, 'Local street food hub.', 'Sector15Foodie'),
  r('Shree Rathnam FBD', 'faridabad', 'Cafes', 1100, 'South Indian in Faridabad. Dosa therapy.', 'DosaTherapy'),
  r('Night Food Market FBD', 'faridabad', 'Street Food', 1000, 'Evening kebabs and rolls.', 'FBDNight'),

  // Ghaziabad
  r('Shipra Mall Food Court', 'ghaziabad', 'Cafes', 1500, 'Indirapuram food hub.', 'IndirapuramEats'),
  r('Vaishali Chaat Market', 'ghaziabad', 'Street Food', 1400, 'Evening chaat walk. Sector 4 vibes.', 'VaishaliChaat'),
  r('Rajender Nagar Food GZB', 'ghaziabad', 'Street Food', 1200, 'Local market gems.', 'GZBLocal'),
  r('Momos Corner GZB', 'ghaziabad', 'Street Food', 1100, 'Affordable momos near college.', 'CollegeMomos'),
  r('Bikanervala GZB', 'ghaziabad', 'Street Food', 1300, 'Multi-city empire. Always delivers.', 'EmpireSnack'),

  // Delhi Cantonment
  r('Panchsheel Club Dining', 'delhicant', 'Fine Dining', 1800, 'Military precision in food. Officers mess vibes.', 'OfficerMess'),
  r('Dhaba near Cant Station', 'delhicant', 'Street Food', 1200, 'Simple dal roti. Honest food.', 'HonestFood'),
  r('Cantonment Bakery', 'delhicant', 'Cafes', 1100, 'Old-style Indian bakery. Fruit cake heritage.', 'HeritageBake'),
  r('Tea Stall Cant', 'delhicant', 'Street Food', 1000, 'Chai with discipline. Strong and sweet.', 'DisciplinedChai'),
  r('Cant Area Samosa', 'delhicant', 'Street Food', 900, 'Samosas near the station. Quick bite.', 'QuickSamosa'),

  // Daryaganj
  r('Daryaganj Restaurant', 'daryaganj', 'Fine Dining', 2500, 'Claims to have invented butter chicken. Judge for yourself.', 'ButterChickenDebate'),
  r('Sunday Book Market Chaat', 'daryaganj', 'Street Food', 1800, 'Books and bhelpuri. Sunday ritual.', 'BookwormChaat'),
  r('Lotan Chole Kulche', 'daryaganj', 'Street Food', 2200, 'Heritage chole kulche. Generations approved.', 'CulcheHeritage'),
  r('Haji Noora Biryani', 'daryaganj', 'Street Food', 2000, 'Old Delhi biryani. Spiced to perfection.', 'BiryaniOldDelhi'),
  r('Giani Di Hatti Original', 'daryaganj', 'Street Food', 1600, 'Rabri faluda. The original since 1790.', 'Since1790'),

  // Moti Nagar
  r('Moti Nagar Market Food', 'motiNagar', 'Street Food', 1400, 'Local gems. Chole bhature and parathas.', 'MNLocal'),
  r('Chinese Van MN', 'motiNagar', 'Street Food', 1100, 'Night Chinese. Spring rolls from a cart.', 'CartChinese'),
  r('Tikki Stall MN', 'motiNagar', 'Street Food', 1200, 'Evening aloo tikki. Crowd favourite.', 'TikkiCrowd'),
  r('Sharma Sweets MN', 'motiNagar', 'Street Food', 1000, 'Jalebis and gulab jamun. Comfort sweets.', 'ComfortSweet'),
  r('Kirti Nagar Furniture Market Dhaba', 'motiNagar', 'Street Food', 1300, 'Dhaba food between furniture shopping.', 'FurnitureDhaba'),

  // Naraina
  r('Naraina Industrial Dhaba', 'naraina', 'Street Food', 1500, 'Worker-class food. Real dal and sabzi.', 'WorkerFood'),
  r('Night Food Stalls Naraina', 'naraina', 'Street Food', 1300, 'Post-10 PM food scene. Rolls and kebabs.', 'NarainaNight'),
  r('South Indian Express N', 'naraina', 'Street Food', 1000, 'Quick dosa between business meetings.', 'BusinessDosa'),
  r('Naraina Chaat Point', 'naraina', 'Street Food', 1100, 'Evening golgappe. Simple pleasures.', 'SimplePleasure'),
  r('Tikka Express Naraina', 'naraina', 'Street Food', 1200, 'Paneer and chicken tikka. Quick service.', 'QuickTikka'),

  // Maujpur
  r('Maujpur Chowk Food', 'musamvihar', 'Street Food', 1300, 'Local street food. Authentic NE Delhi.', 'NEDelhiLocal'),
  r('Kebab Gali Maujpur', 'musamvihar', 'Street Food', 1200, 'Evening kebab stalls. Raw and smoky.', 'SmokyKebab'),
  r('Sharma Chole Bhature M', 'musamvihar', 'Street Food', 1100, 'Morning breakfast. Lines before sunrise.', 'SunriseChole'),
  r('Biryani House Maujpur', 'musamvihar', 'Street Food', 1000, 'Affordable biryani. Family packs available.', 'FamilyBiryani'),
  r('Sweet Hub Maujpur', 'musamvihar', 'Street Food', 900, 'Festival sweets and everyday jalebis.', 'FestivalReady'),

  // Nizamuddin
  r('Karim\'s Nizamuddin', 'nizamuddin', 'Fine Dining', 2800, 'Branch of the legend. Mutton burra perfection.', 'KarimsBranch'),
  r('Gali Kebab Corner', 'nizamuddin', 'Street Food', 2200, 'Seekh kebabs in the gali. Night food pilgrimage.', 'NightPilgrim'),
  r('Dargah Area Biryani', 'nizamuddin', 'Street Food', 2000, 'Post-qawwali biryani. Spiritual eating.', 'SufiBiryani'),
  r('Chai at Nizamuddin Station', 'nizamuddin', 'Street Food', 1200, 'Platform chai. Best when the train is late.', 'PlatformChai'),
  r('Mughlai Paratha Stall', 'nizamuddin', 'Street Food', 1800, 'Stuffed parathas with keema. Heavy and happy.', 'HeavyHappy'),

  // Jangpura
  r('Bhogal Market Food Walk', 'jangpura', 'Street Food', 2000, 'Hidden expat food scene. Korean to Ethiopian.', 'BhogalWalker'),
  r('Korean Food Bhogal', 'jangpura', 'Hidden Gems', 1800, 'Authentic kimchi and bibimbap. Secret Delhi.', 'KoreanInDelhi'),
  r('Momos Aunty Jangpura', 'jangpura', 'Street Food', 1400, 'Steamed momos. Aunty knows best.', 'AuntyMomos'),
  r('Bhogal Chaat House', 'jangpura', 'Street Food', 1200, 'Local chaat. No tourists, just locals.', 'LocalsOnly'),
  r('Northeast Kitchen', 'jangpura', 'Hidden Gems', 1600, 'Naga and Manipuri food. Spice warriors only.', 'SpiceWarrior'),

  // East of Kailash
  r('EoK Market Chaat', 'eastofkailash', 'Street Food', 1400, 'Quiet market with good evening chaat.', 'QuietChaat'),
  r('South Indian House EoK', 'eastofkailash', 'Cafes', 1200, 'Idli-sambar in a residential area.', 'ResidentialDosa'),
  r('EoK Bakery', 'eastofkailash', 'Cafes', 1100, 'Cakes and pastries for colony gatherings.', 'ColonyBaker'),
  r('Tikki Corner EoK', 'eastofkailash', 'Street Food', 1000, 'Evening aloo tikki. Colony favourite.', 'ColonyTikki'),
  r('Momos Express EoK', 'eastofkailash', 'Street Food', 1300, 'Quick momos. After-school snack.', 'SchoolSnack'),

  // Okhla
  r('Jamia Food Street', 'okhla', 'Street Food', 2200, 'Near Jamia Millia. Biryani and kebabs galore.', 'JamiaFoodie'),
  r('Al Bake Okhla', 'okhla', 'Street Food', 1800, 'Shawarma and kebab roll institution.', 'ShawarmaKing'),
  r('Suleman Biryani', 'okhla', 'Street Food', 2000, 'Bucket biryani. Feeds the whole gang.', 'BucketBiryani'),
  r('Okhla Mandi Chai', 'okhla', 'Street Food', 1000, 'Early morning chai at the mandi. Authentic.', 'MandiChai'),
  r('Tandoor Corner Okhla', 'okhla', 'Street Food', 1500, 'Naan and kebab. Simple, powerful.', 'SimpleKebab'),

  // Mehrauli
  r('Olive Bar & Kitchen', 'mehrauli', 'Fine Dining', 2800, 'Mediterranean by the ruins. Delhi\'s most romantic.', 'RomanticDinner'),
  r('Qutub View Dhaba', 'mehrauli', 'Street Food', 1500, 'Dhaba with Qutub Minar view. Only in Delhi.', 'QutubDhaba'),
  r('Mehrauli Heritage Food Walk', 'mehrauli', 'Street Food', 1800, 'Archaeological park area. History + food.', 'HeritageWalk'),
  r('Lakhori Gate Biryani', 'mehrauli', 'Street Food', 1400, 'Old Mehrauli biryani. Recipes from Mughal era.', 'MughalRecipe'),
  r('Garden of Five Senses Cafe', 'mehrauli', 'Cafes', 1200, 'Coffee in the garden. Peaceful escape.', 'GardenEscape'),

  // Munirka
  r('Momos Capital Munirka', 'munirka', 'Street Food', 2500, 'THE momos hub of Delhi. Every variety exists.', 'MomosCapital'),
  r('JNU Dhaba', 'munirka', 'Street Food', 1800, 'Student food. Cheap, filling, political.', 'JNUFoodie'),
  r('Korean Restaurant Munirka', 'munirka', 'Hidden Gems', 1600, 'Authentic Korean in a student neighbourhood.', 'KoreanMunirka'),
  r('Afghani Chicken Munirka', 'munirka', 'Street Food', 2000, 'Cream-based chicken that started a revolution.', 'AfghaniOG'),
  r('Northeast Food Munirka', 'munirka', 'Hidden Gems', 1400, 'Thukpa and pork momos. Authentic NE flavors.', 'NEFlavors'),
];
