(function () {
  "use strict";

  var STORAGE_KEY = "denyse_language_v1";
  var languages = {
    rw: {
      "Denyse Shop | Kigali phones & electronics": "Denyse Shop | Terefone n'ibikoresho bya elegitoroniki i Kigali",
      "Shop all products | Denyse Shop": "Ibicuruzwa byose | Denyse Shop",
      "Product | Denyse Shop": "Igicuruzwa | Denyse Shop",
      "Your Cart | Denyse Shop": "Igitebo cyawe | Denyse Shop",
      "Checkout | Denyse Shop": "Kwishyura | Denyse Shop",
      "My Account | Denyse Shop": "Konti yanjye | Denyse Shop",
      "Order received | Denyse Shop": "Ibyatumijwe byakiriwe | Denyse Shop",
      "Search products": "Shakisha ibicuruzwa",
      "Search phones, electronics...": "Shakisha telefoni n'ibikoresho bya elegitoroniki...",
      "Search products...": "Shakisha ibicuruzwa...",
      Search: "Shakisha",
      "Shopping cart": "Igitebo cyo guhaha",
      "My account": "Konti yanjye",
      "Choose language": "Hitamo ururimi",
      Home: "Ahabanza",
      Shop: "Iduka",
      Cart: "Igitebo",
      Checkout: "Kwishyura",
      "My Orders": "Ibyo natumije",
      Account: "Konti",
      "Questions?": "Ufite ikibazo?",
      "Need help?": "Ukeneye ubufasha?",
      "Call Denyse: 0794753660": "Hamagara Denyse: 0794753660",
      "Continue shopping": "Komeza guhaha",
      "YOUR KIGALI TECH STORE": "IDUKA RYA TEKINOLOGI RYA KIGALI",
      "A little more": "Ongeraho akanyamuneza",
      "joy in every day.": "buri munsi.",
      "Find the phone, tablet and everyday tech that feels just right. Personal service from Denyse Shop, Kigali.": "Shaka telefoni, tableti n'ibikoresho bya buri munsi bikubereye. Denyse Shop i Kigali iguha serivisi yihariye.",
      "Explore the shop": "Reba ibicuruzwa",
      "Talk to Denyse": "Vugana na Denyse",
      "Thoughtfully selected tech": "Ikoranabuhanga ryatoranyijwe neza",
      "Kigali delivery": "Kugeza i Kigali",
      "THE DENYSE SHOP DASHBOARD": "IBICURUZWA BYA DENYSE SHOP",
      "What are you looking for?": "Urashaka iki?",
      "All products": "Ibicuruzwa byose",
      "CUSTOMER FAVOURITES": "IBIKUNDWA N'ABAKILIYA",
      "Best Sellers": "Ibyakunzwe cyane",
      "Shop all": "Reba byose",
      "FRESH FINDS": "IBISHYA",
      "New Arrivals": "Ibicuruzwa bishya",
      "Discover more": "Menya ibindi",
      "A LITTLE TREAT": "IMPANO NTO",
      "Discount −20%": "Igabanyirizwa −20%",
      "Lovely finds, a little lighter on your wallet.": "Ibicuruzwa byiza ku giciro kigufasha kuzigama.",
      "See the offers": "Reba ibiciro byagabanyijwe",
      "Offer display uses the listed product prices as sale prices. Confirm current offers with Denyse.": "Ibiciro byagabanyijwe byerekanwa hashingiwe ku biciro biri ku bicuruzwa. Emeza ibiciro biriho na Denyse.",
      "HERE FOR YOU": "TURI HANO KUGUFASHA",
      "Good tech, good people.": "Ikoranabuhanga ryiza, abantu beza.",
      "Have a question? Denyse is just a message away.": "Ufite ikibazo? Ohereza Denyse ubutumwa.",
      "Chat on WhatsApp ↗": "Vugana natwe kuri WhatsApp ↗",
      "My Account": "Konti yanjye",
      "How an order travels": "Uko ibyo watumije bigera kuri wowe",
      "A LITTLE SOMETHING FOR EVERYONE": "IBIKWIRIYE BURI WESE",
      "Shop our collection": "Gura mu bicuruzwa byacu",
      All: "Byose",
      Telephone: "Terefone",
      Tablet: "Tableti",
      Headphone: "Ibyuma byo kumva",
      Mouse: "Imbeba za mudasobwa",
      Cable: "Insinga",
      Machine: "Imashini",
      "All prices": "Ibiciro byose",
      "Under 20,000": "Munsi ya 20,000",
      "20,000 - 100,000": "20,000 - 100,000",
      "100,000 - 300,000": "100,000 - 300,000",
      "Above 300,000": "Hejuru ya 300,000",
      Newest: "Ibishya",
      "Most loved": "Ibyakunzwe cyane",
      "Price: Low to High": "Igiciro: gito ujya ku kinini",
      "Price: High to Low": "Igiciro: kinini ujya ku gito",
      "No products found": "Nta bicuruzwa bibonetse",
      "Try a different search or category.": "Gerageza gushakisha ukundi cyangwa uhitemo ikindi cyiciro.",
      "Clear filters": "Siba ibyo wahisemo",
      "Coming soon": "Biraza vuba",
      "View Telephones": "Reba amatelefoni",
      "View Tablets": "Reba amatableti",
      "View Headphones": "Reba ibyuma byo kumva",
      "View Mouse": "Reba imbeba za mudasobwa",
      "View Cables": "Reba insinga",
      "View Machines": "Reba imashini",
      "Product not found": "Igicuruzwa nticyabonetse",
      "This product may have been removed from the shop.": "Iki gicuruzwa gishobora kuba kitakiri mu iduka.",
      "Browse the shop": "Reba ibicuruzwa",
      "Add to Cart": "Ongeraho mu gatebo",
      "♡ Add to Cart": "♡ Ongeraho mu gatebo",
      "Buy Now": "Gura nonaha",
      "Add to Favorite": "Ongeraho ku byo ukunda",
      "Remove from Favorite": "Kuraho mu byo ukunda",
      "Product details": "Ibirambuye ku gicuruzwa",
      "Warranty:": "Garanti:",
      "In stock": "Kirahari",
      "In stock ·": "Kirahari ·",
      "Check availability with Denyse": "Baza Denyse niba gihari",
      "Decrease quantity": "Gabanya umubare",
      "Increase quantity": "Ongera umubare",
      "Call Denyse": "Hamagara Denyse",
      "WhatsApp Denyse": "Andikira Denyse kuri WhatsApp",
      "Rated 5 out of 5": "Cyahawe amanota 5 kuri 5",
      "Your shopping cart": "Igitebo cyawe",
      "YOUR BAG IS WAITING": "IGITEBO CYAWE KIRATEGEREJE",
      "Your cart is empty": "Igitebo cyawe kirimo ubusa",
      "Have a look around and find something you love.": "Reba ibicuruzwa ushake icyo ukunda.",
      "Order summary": "Incamake y'ibyo watumije",
      Subtotal: "Igiteranyo cy'ibicuruzwa",
      "Delivery in Kigali": "Kugeza i Kigali",
      "Grand total": "Igiteranyo rusange",
      "DENYSE5 discount (5%)": "Igabanyirizwa rya DENYSE5 (5%)",
      "Promo code": "Kode y'igabanyirizo",
      Applied: "Byakoreshejwe",
      Apply: "Koresha",
      "Promo code applied — you saved 5%.": "Kode yakoreshejwe — wazigamye 5%.",
      "Continue to checkout": "Komeza ujye kwishyura",
      Remove: "Kuraho",
      each: "buri kimwe",
      "A lovely choice, nearly yours": "Wahisemo neza, hasigaye gato",
      "Almost yours": "Hasigaye gato",
      "DELIVERY IN KIGALI": "KUGEZA I KIGALI",
      "Delivery Details": "Amakuru yo kugeza",
      Edit: "Hindura",
      "Add your delivery details.": "Ongeramo amakuru yo kugeza.",
      "Create an account": "Fungura konti",
      "Full Name *": "Amazina yose *",
      "Phone Number *": "Nimero ya telefoni *",
      "WhatsApp Number": "Nimero ya WhatsApp",
      Email: "Imeyili",
      "District *": "Akarere *",
      "Choose district": "Hitamo akarere",
      "Sector / Cell": "Umurenge / Akagari",
      "Full Address *": "Aderesi yose *",
      "Delivery Note": "Icyitonderwa cyo kugeza",
      "e.g. Near Kigali Market": "Urugero: Hafi y'isoko rya Kigali",
      "Choose payment": "Hitamo uburyo bwo kwishyura",
      "Pay to Denyse Shop · 0794753660": "Ishyura Denyse Shop · 0794753660",
      "Confirm payment with Denyse": "Emeza ubwishyu na Denyse",
      "Pay when your order arrives": "Ishyura ibyo watumije bikuzaniwe",
      "Payment safety": "Umutekano w'ubwishyu",
      "This static website does not process mobile-money payments and never asks for your PIN.": "Uru rubuga ntirwishyurisha kuri telefoni kandi ntirusaba PIN yawe.",
      "Place My Order": "Ohereza ibyo ntumije",
      "Delivery within 2 hours in Kigali": "Bikugeraho mu masaha 2 i Kigali",
      "Your saved details will appear here next time.": "Amakuru wabikije azagaragara hano ubutaha.",
      "Pay to Denyse Shop · 0794753660. Confirm securely using the official MTN MoMo prompt. Never enter your PIN on this website.": "Ishyura Denyse Shop · 0794753660. Emeza ubwishyu muri MTN MoMo yemewe. Ntukandike PIN yawe kuri uru rubuga.",
      "Arrange Airtel Money payment directly with Denyse on 0794753660. This website does not process payments.": "Vugana na Denyse kuri 0794753660 ku bijyanye na Airtel Money. Uru rubuga ntirwakira ubwishyu.",
      "Mobile money payment": "Kwishyura kuri telefoni",
      "Got it": "Ndabyumvise",
      "Full Home Address / Street / House Number *": "Aderesi y'urugo / Umuhanda / Nimero y'inzu *",
      "Profile Photo URL": "Aderesi y'ifoto yawe",
      "(optional)": "(si ngombwa)",
      "Password *": "Ijambo ry'ibanga *",
      "Save My Details": "Bika amakuru yanjye",
      Cancel: "Kureka",
      "Create your account": "Fungura konti yawe",
      "Save your details once for a smoother checkout next time.": "Bika amakuru yawe rimwe kugira ngo ubutaha kwishyura byihute.",
      "A note about privacy": "Icyitonderwa ku ibanga",
      "This GitHub Pages demo keeps profile details in this browser only. The password is required for the form but is never saved. This is not a secure login system.": "Uru rugero rwa GitHub Pages rubika amakuru ya konti muri iyi browser gusa. Ijambo ry'ibanga ntiribikwa. Ubu si uburyo bwizewe bwo kwinjira.",
      "Minimum 8 characters. It is checked by this form and immediately discarded—not stored.": "Andika inyuguti nibura 8. Ijambo ry'ibanga rigenzurwa ako kanya kandi ntiribikwa.",
      "WELCOME TO YOUR ACCOUNT": "IKAZE KURI KONTI YAWE",
      "Edit My Details": "Hindura amakuru yanjye",
      "YOUR SHOPPING STORY": "AMATEKA YO GUHAHA",
      "My Addresses": "Aderesi zanjye",
      "DELIVERY MADE EASY": "KUGEZWA BYOROSHYE",
      "SAVED FOR LATER": "IBYO WABIKIYE NYUMA",
      "My Favorites": "Ibyo nkunda",
      "Your first order is waiting to happen.": "Ibyo utumije bwa mbere biragutegereje.",
      "Explore the shop →": "Reba ibicuruzwa →",
      "Saved delivery address": "Aderesi yo kugeza yabitswe",
      "Not added": "Ntabwo byongeweho",
      "Edit address": "Hindura aderesi",
      "Find more →": "Shaka ibindi →",
      "Tap the heart on a product to save it here.": "Kanda umutima ku gicuruzwa ukibike hano.",
      "Browse products →": "Reba ibicuruzwa →",
      "Switch customer on this browser": "Hindura umukiliya muri iyi browser",
      "This profile is saved only in this browser.": "Iyi konti ibitswe muri iyi browser gusa.",
      "Edit your details": "Hindura amakuru yawe",
      "Save My Changes": "Bika ibyo nahinduye",
      "Not stored — leave blank": "Ntibibikwa — siga aho ubusa",
      "Your details are saved on this browser": "Amakuru yawe yabitswe muri iyi browser",
      "Customer profile switched off for this browser": "Konti y'umukiliya yahagaritswe muri iyi browser",
      "THANK YOU FOR SHOPPING WITH US": "URAKOZE KUGURIRA KURI DENYSE SHOP",
      "Murakoze! Order yawe yakiriwe neza": "Murakoze! Icyo watumije cyakiriwe neza",
      "Order number:": "Nimero y'ibyo watumije:",
      "Denyse Shop will call you on 0794753660 soon.": "Denyse Shop iraguhamagara kuri 0794753660 vuba.",
      "Delivery: within 2 hours in Kigali.": "Kugeza: mu masaha 2 i Kigali.",
      "Back to Home": "Subira ahabanza",
      "Send order on WhatsApp ↗": "Ohereza ibyo watumije kuri WhatsApp ↗",
      "We appreciate you choosing Denyse Shop.": "Turagushimira kuba wahisemo Denyse Shop.",
      Pending: "Birategereje",
      Paid: "Byishyuwe",
      Delivered: "Byagejejwe",
      "Could not save changes. Check this browser's storage.": "Impinduka ntizabitswe. Reba ububiko bw'iyi browser.",
      "This product is no longer available.": "Iki gicuruzwa ntikikiboneka.",
      "Added to your favourites": "Wongeyeho mu byo ukunda",
      "Removed from your favourites": "Wakuye mu byo ukunda",
      "Promo code applied — 5% off": "Kode yakoreshejwe — ugabanyirijwe 5%",
      "That promo code isn't valid. Check it and try again.": "Iyo kode si yo. Yigenzure wongere ugerageze.",
      "Enter a valid phone number.": "Andika nimero ya telefoni yemewe.",
      "Enter a valid WhatsApp number.": "Andika nimero ya WhatsApp yemewe."
    },
    fr: {
      "Denyse Shop | Kigali phones & electronics": "Denyse Shop | Téléphones et électronique à Kigali",
      "Shop all products | Denyse Shop": "Tous les produits | Denyse Shop",
      "Product | Denyse Shop": "Produit | Denyse Shop",
      "Your Cart | Denyse Shop": "Votre panier | Denyse Shop",
      "Checkout | Denyse Shop": "Paiement | Denyse Shop",
      "My Account | Denyse Shop": "Mon compte | Denyse Shop",
      "Order received | Denyse Shop": "Commande reçue | Denyse Shop",
      "Search products": "Rechercher des produits",
      "Search phones, electronics...": "Rechercher téléphones et appareils...",
      "Search products...": "Rechercher des produits...",
      Search: "Rechercher",
      "Shopping cart": "Panier",
      "My account": "Mon compte",
      "Choose language": "Choisir la langue",
      Home: "Accueil",
      Shop: "Boutique",
      Cart: "Panier",
      Checkout: "Paiement",
      "My Orders": "Mes commandes",
      Account: "Compte",
      "Questions?": "Une question ?",
      "Need help?": "Besoin d'aide ?",
      "Call Denyse: 0794753660": "Appeler Denyse : 0794753660",
      "Continue shopping": "Continuer mes achats",
      "YOUR KIGALI TECH STORE": "VOTRE BOUTIQUE TECH À KIGALI",
      "A little more": "Un peu plus",
      "joy in every day.": "de joie chaque jour.",
      "Find the phone, tablet and everyday tech that feels just right. Personal service from Denyse Shop, Kigali.": "Trouvez le téléphone, la tablette et les accessoires qu'il vous faut. Un service personnalisé chez Denyse Shop, Kigali.",
      "Explore the shop": "Découvrir la boutique",
      "Talk to Denyse": "Parler à Denyse",
      "Thoughtfully selected tech": "Une sélection tech soigneuse",
      "Kigali delivery": "Livraison à Kigali",
      "THE DENYSE SHOP DASHBOARD": "LA SÉLECTION DENYSE SHOP",
      "What are you looking for?": "Que recherchez-vous ?",
      "All products": "Tous les produits",
      "CUSTOMER FAVOURITES": "LES PRÉFÉRÉS DES CLIENTS",
      "Best Sellers": "Meilleures ventes",
      "Shop all": "Tout voir",
      "FRESH FINDS": "NOUVEAUTÉS",
      "New Arrivals": "Nouveaux arrivages",
      "Discover more": "En découvrir plus",
      "A LITTLE TREAT": "UNE PETITE ATTENTION",
      "Discount −20%": "Réduction −20%",
      "Lovely finds, a little lighter on your wallet.": "De belles trouvailles à prix plus doux.",
      "See the offers": "Voir les offres",
      "Offer display uses the listed product prices as sale prices. Confirm current offers with Denyse.": "Les prix barrés sont indicatifs. Confirmez les offres en cours avec Denyse.",
      "HERE FOR YOU": "À VOTRE ÉCOUTE",
      "Good tech, good people.": "La bonne tech, les bonnes personnes.",
      "Have a question? Denyse is just a message away.": "Une question ? Denyse est à votre écoute.",
      "Chat on WhatsApp ↗": "Écrire sur WhatsApp ↗",
      "My Account": "Mon compte",
      "How an order travels": "Le parcours d'une commande",
      "A LITTLE SOMETHING FOR EVERYONE": "QUELQUE CHOSE POUR CHACUN",
      "Shop our collection": "Parcourir la collection",
      All: "Tout",
      Telephone: "Téléphones",
      Tablet: "Tablettes",
      Headphone: "Casques",
      Mouse: "Souris",
      Cable: "Câbles",
      Machine: "Machines",
      "All prices": "Tous les prix",
      "Under 20,000": "Moins de 20 000",
      "20,000 - 100,000": "20 000 - 100 000",
      "100,000 - 300,000": "100 000 - 300 000",
      "Above 300,000": "Plus de 300 000",
      Newest: "Plus récents",
      "Most loved": "Les plus appréciés",
      "Price: Low to High": "Prix : croissant",
      "Price: High to Low": "Prix : décroissant",
      "No products found": "Aucun produit trouvé",
      "Try a different search or category.": "Essayez une autre recherche ou catégorie.",
      "Clear filters": "Effacer les filtres",
      "Coming soon": "Bientôt disponible",
      "View Telephones": "Voir les téléphones",
      "View Tablets": "Voir les tablettes",
      "View Headphones": "Voir les casques",
      "View Mouse": "Voir les souris",
      "View Cables": "Voir les câbles",
      "View Machines": "Voir les machines",
      "Product not found": "Produit introuvable",
      "This product may have been removed from the shop.": "Ce produit n'est peut-être plus disponible.",
      "Browse the shop": "Parcourir la boutique",
      "Add to Cart": "Ajouter au panier",
      "♡ Add to Cart": "♡ Ajouter au panier",
      "Buy Now": "Acheter maintenant",
      "Add to Favorite": "Ajouter aux favoris",
      "Remove from Favorite": "Retirer des favoris",
      "Product details": "Détails du produit",
      "Warranty:": "Garantie :",
      "In stock": "En stock",
      "In stock ·": "En stock ·",
      "Check availability with Denyse": "Vérifier la disponibilité auprès de Denyse",
      "Decrease quantity": "Diminuer la quantité",
      "Increase quantity": "Augmenter la quantité",
      "Call Denyse": "Appeler Denyse",
      "WhatsApp Denyse": "Écrire à Denyse sur WhatsApp",
      "Rated 5 out of 5": "Noté 5 sur 5",
      "Your shopping cart": "Votre panier",
      "YOUR BAG IS WAITING": "VOTRE PANIER VOUS ATTEND",
      "Your cart is empty": "Votre panier est vide",
      "Have a look around and find something you love.": "Parcourez la boutique et trouvez votre bonheur.",
      "Order summary": "Récapitulatif de la commande",
      Subtotal: "Sous-total",
      "Delivery in Kigali": "Livraison à Kigali",
      "Grand total": "Total général",
      "DENYSE5 discount (5%)": "Réduction DENYSE5 (5 %)",
      "Promo code": "Code promo",
      Applied: "Appliqué",
      Apply: "Appliquer",
      "Promo code applied — you saved 5%.": "Code promo appliqué — vous économisez 5 %.",
      "Continue to checkout": "Continuer vers le paiement",
      Remove: "Retirer",
      each: "l'unité",
      "A lovely choice, nearly yours": "Un excellent choix, bientôt à vous",
      "Almost yours": "Bientôt à vous",
      "DELIVERY IN KIGALI": "LIVRAISON À KIGALI",
      "Delivery Details": "Coordonnées de livraison",
      Edit: "Modifier",
      "Add your delivery details.": "Ajoutez vos coordonnées de livraison.",
      "Create an account": "Créer un compte",
      "Full Name *": "Nom complet *",
      "Phone Number *": "Numéro de téléphone *",
      "WhatsApp Number": "Numéro WhatsApp",
      Email: "E-mail",
      "District *": "District *",
      "Choose district": "Choisir un district",
      "Sector / Cell": "Secteur / cellule",
      "Full Address *": "Adresse complète *",
      "Delivery Note": "Note de livraison",
      "e.g. Near Kigali Market": "ex. près du marché de Kigali",
      "Choose payment": "Choisir le mode de paiement",
      "Pay to Denyse Shop · 0794753660": "Payer Denyse Shop · 0794753660",
      "Confirm payment with Denyse": "Confirmer le paiement avec Denyse",
      "Pay when your order arrives": "Payer à la livraison",
      "Payment safety": "Sécurité du paiement",
      "This static website does not process mobile-money payments and never asks for your PIN.": "Ce site ne traite pas les paiements mobiles et ne demande jamais votre code PIN.",
      "Place My Order": "Confirmer ma commande",
      "Delivery within 2 hours in Kigali": "Livraison sous 2 heures à Kigali",
      "Your saved details will appear here next time.": "Vos coordonnées enregistrées apparaîtront ici la prochaine fois.",
      "Pay to Denyse Shop · 0794753660. Confirm securely using the official MTN MoMo prompt. Never enter your PIN on this website.": "Payez Denyse Shop · 0794753660. Confirmez via la demande officielle MTN MoMo. Ne saisissez jamais votre code PIN sur ce site.",
      "Arrange Airtel Money payment directly with Denyse on 0794753660. This website does not process payments.": "Pour Airtel Money, contactez Denyse au 0794753660. Ce site ne traite pas les paiements.",
      "Mobile money payment": "Paiement mobile",
      "Got it": "Compris",
      "Full Home Address / Street / House Number *": "Adresse complète / rue / numéro de maison *",
      "Profile Photo URL": "Lien de la photo de profil",
      "(optional)": "(facultatif)",
      "Password *": "Mot de passe *",
      "Save My Details": "Enregistrer mes coordonnées",
      Cancel: "Annuler",
      "Create your account": "Créer votre compte",
      "Save your details once for a smoother checkout next time.": "Enregistrez vos coordonnées pour payer plus rapidement la prochaine fois.",
      "A note about privacy": "À propos de la confidentialité",
      "This GitHub Pages demo keeps profile details in this browser only. The password is required for the form but is never saved. This is not a secure login system.": "Cette démo GitHub Pages conserve les coordonnées dans ce navigateur uniquement. Le mot de passe n'est jamais enregistré. Ce système n'offre pas de connexion sécurisée.",
      "Minimum 8 characters. It is checked by this form and immediately discarded—not stored.": "8 caractères minimum. Le mot de passe est vérifié puis immédiatement supprimé, jamais enregistré.",
      "WELCOME TO YOUR ACCOUNT": "BIENVENUE DANS VOTRE COMPTE",
      "Edit My Details": "Modifier mes coordonnées",
      "YOUR SHOPPING STORY": "VOS COMMANDES",
      "My Addresses": "Mes adresses",
      "DELIVERY MADE EASY": "LIVRAISON SIMPLIFIÉE",
      "SAVED FOR LATER": "ENREGISTRÉS POUR PLUS TARD",
      "My Favorites": "Mes favoris",
      "Your first order is waiting to happen.": "Votre première commande n'attend que vous.",
      "Explore the shop →": "Découvrir la boutique →",
      "Saved delivery address": "Adresse de livraison enregistrée",
      "Not added": "Non renseigné",
      "Edit address": "Modifier l'adresse",
      "Find more →": "En découvrir plus →",
      "Tap the heart on a product to save it here.": "Touchez le cœur d'un produit pour l'enregistrer ici.",
      "Browse products →": "Parcourir les produits →",
      "Switch customer on this browser": "Changer de client sur ce navigateur",
      "This profile is saved only in this browser.": "Ce profil est enregistré uniquement dans ce navigateur.",
      "Edit your details": "Modifier vos coordonnées",
      "Save My Changes": "Enregistrer les modifications",
      "Not stored — leave blank": "Non enregistré — laisser vide",
      "Your details are saved on this browser": "Vos coordonnées sont enregistrées dans ce navigateur",
      "Customer profile switched off for this browser": "Le profil client a été désactivé dans ce navigateur",
      "THANK YOU FOR SHOPPING WITH US": "MERCI D'AVOIR CHOISI DENYSE SHOP",
      "Murakoze! Order yawe yakiriwe neza": "Merci ! Votre commande a bien été reçue.",
      "Order number:": "Numéro de commande :",
      "Denyse Shop will call you on 0794753660 soon.": "Denyse Shop vous appellera bientôt au 0794753660.",
      "Delivery: within 2 hours in Kigali.": "Livraison : sous 2 heures à Kigali.",
      "Back to Home": "Retour à l'accueil",
      "Send order on WhatsApp ↗": "Envoyer la commande sur WhatsApp ↗",
      "We appreciate you choosing Denyse Shop.": "Merci d'avoir choisi Denyse Shop.",
      Pending: "En attente",
      Paid: "Payée",
      Delivered: "Livrée",
      "Could not save changes. Check this browser's storage.": "Impossible d'enregistrer les modifications. Vérifiez le stockage du navigateur.",
      "This product is no longer available.": "Ce produit n'est plus disponible.",
      "Added to your favourites": "Ajouté à vos favoris",
      "Removed from your favourites": "Retiré de vos favoris",
      "Promo code applied — 5% off": "Code promo appliqué — 5 % de réduction",
      "That promo code isn't valid. Check it and try again.": "Ce code promo est invalide. Vérifiez-le et réessayez.",
      "Enter a valid phone number.": "Saisissez un numéro de téléphone valide.",
      "Enter a valid WhatsApp number.": "Saisissez un numéro WhatsApp valide."
    }
  };
  var patterns = [
    {
      regex: /^\/ (.+)$/,
      translate: function (match, language) { return "/ " + translateValue(match[1], language); }
    },
    {
      regex: /^(\d+)\s+(items?|products?|orders?)$/,
      translate: function (match, language) {
        var units = {
          rw: { item: "ikintu", items: "ibintu", product: "igicuruzwa", products: "ibicuruzwa", order: "icyatumijwe", orders: "ibyo watumije" },
          fr: { item: "article", items: "articles", product: "produit", products: "produits", order: "commande", orders: "commandes" }
        };
        var count = Number(match[1]);
        var unit = count === 1 ? match[2].replace(/s$/, "") : match[2].replace(/s?$/, "s");
        return match[1] + " " + (units[language][unit] || units[language][match[2]]);
      }
    },
    {
      regex: /^From (.+)$/,
      translate: function (match, language) { return (language === "rw" ? "Guhera kuri " : "À partir de ") + match[1]; }
    },
    {
      regex: /^(\d+) available$/,
      translate: function (match, language) { return match[1] + (language === "rw" ? " birahari" : " disponibles"); }
    },
    {
      regex: /^Hello, (.+)$/,
      translate: function (match, language) { return (language === "rw" ? "Muraho, " : "Bonjour, ") + match[1]; }
    },
    {
      regex: /^Total: (.+)$/,
      translate: function (match, language) { return (language === "rw" ? "Igiteranyo: " : "Total : ") + match[1]; }
    },
    {
      regex: /^Delivery note: (.+)$/,
      translate: function (match, language) { return (language === "rw" ? "Icyitonderwa cyo kugeza: " : "Note de livraison : ") + match[1]; }
    },
    {
      regex: /^WhatsApp: (.+)$/,
      translate: function (match, language) { return (language === "rw" ? "WhatsApp: " : "WhatsApp : ") + match[1]; }
    },
    {
      regex: /^(.+) added to your cart$/,
      translate: function (match, language) { return match[1] + (language === "rw" ? " wongewe mu gatebo" : " ajouté à votre panier"); }
    },
    {
      regex: /^Add (.+) to favourites$/,
      translate: function (match, language) { return (language === "rw" ? "Ongeraho " + match[1] + " ku byo ukunda" : "Ajouter " + match[1] + " aux favoris"); }
    },
    {
      regex: /^Remove (.+) from favourites$/,
      translate: function (match, language) { return (language === "rw" ? "Kuraho " + match[1] + " mu byo ukunda" : "Retirer " + match[1] + " des favoris"); }
    },
    {
      regex: /^Profile photo for (.+)$/,
      translate: function (match, language) { return (language === "rw" ? "Ifoto ya " : "Photo de profil de ") + match[1]; }
    },
    {
      regex: /^(.+ RWF) each$/,
      translate: function (match, language) { return match[1] + (language === "rw" ? " buri kimwe" : " l'unité"); }
    }
  ];
  var textRecords = new WeakMap();
  var attributeRecords = new WeakMap();
  var currentLanguage = "en";
  var originalTitle = document.title;

  function translateValue(value, language) {
    if (language === "en") return value;
    var trimmed = value.trim();
    if (!trimmed) return value;
    var normalized = trimmed.replace(/\s+/g, " ");
    var dictionary = languages[language];
    var translated = Object.prototype.hasOwnProperty.call(dictionary, normalized) ? dictionary[normalized] : null;
    if (!translated) {
      for (var index = 0; index < patterns.length; index += 1) {
        var match = normalized.match(patterns[index].regex);
        if (match) {
          translated = patterns[index].translate(match, language);
          break;
        }
      }
    }
    if (!translated) return value;
    var start = value.indexOf(trimmed);
    return value.slice(0, start) + translated + value.slice(start + trimmed.length);
  }

  function translateTextNode(node) {
    if (node.parentElement && node.parentElement.closest(".brand, .language-switcher, script, style, [data-no-translate]")) return;
    var record = textRecords.get(node);
    if (!record || node.nodeValue !== record.translated) record = { source: node.nodeValue, translated: node.nodeValue };
    var nextValue = translateValue(record.source, currentLanguage);
    record.translated = nextValue;
    textRecords.set(node, record);
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  }

  function translateAttributes(element) {
    ["aria-label", "placeholder", "title"].forEach(function (name) {
      if (!element.hasAttribute(name)) return;
      var records = attributeRecords.get(element) || {};
      var currentValue = element.getAttribute(name);
      var record = records[name];
      if (!record || currentValue !== record.translated) record = { source: currentValue, translated: currentValue };
      var nextValue = translateValue(record.source, currentLanguage);
      record.translated = nextValue;
      records[name] = record;
      attributeRecords.set(element, records);
      if (currentValue !== nextValue) element.setAttribute(name, nextValue);
    });
  }

  function applyLanguage(language) {
    currentLanguage = Object.prototype.hasOwnProperty.call(languages, language) ? language : "en";
    document.documentElement.lang = currentLanguage;
    document.title = translateValue(originalTitle, currentLanguage);
    document.querySelectorAll(".language-switcher [data-language]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.language === currentLanguage ? "true" : "false");
    });
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) translateTextNode(node);
    document.querySelectorAll("[aria-label], [placeholder], [title]").forEach(translateAttributes);
  }

  function readLanguage() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return Object.prototype.hasOwnProperty.call(languages, saved) ? saved : "en";
    } catch (error) {
      console.error("Could not read the saved language preference.", error);
      return "en";
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      console.error("Could not save the language preference.", error);
    }
  }

  function addLanguageSwitcher() {
    var header = document.querySelector(".site-header");
    if (!header || header.querySelector(".language-switcher")) return;
    var group = document.createElement("div");
    group.className = "language-switcher";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Choose language");
    [
      ["rw", "Kinyarwanda"],
      ["en", "English"],
      ["fr", "Français"]
    ].forEach(function (option) {
      var button = document.createElement("button");
      button.type = "button";
      button.dataset.language = option[0];
      button.textContent = option[1];
      group.appendChild(button);
    });
    header.classList.add("has-language-switcher");
    header.insertBefore(group, header.querySelector(".header-actions"));
    group.addEventListener("click", function (event) {
      var button = event.target.closest("[data-language]");
      if (!button) return;
      saveLanguage(button.dataset.language);
      applyLanguage(button.dataset.language);
    });
  }

  function initialize() {
    addLanguageSwitcher();
    applyLanguage(readLanguage());
    var observer = new MutationObserver(function () { applyLanguage(currentLanguage); });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "placeholder", "title"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
}());
