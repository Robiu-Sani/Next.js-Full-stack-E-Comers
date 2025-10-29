// export interface BangladeshLocation {
//   divisions: Division[];
// }

// export interface Division {
//   id: string;
//   name: string;
//   bn_name: string;
//   districts: District[];
// }

// export interface District {
//   id: string;
//   name: string;
//   bn_name: string;
//   division_id: string;
//   upazilas: Upazila[];
// }

// export interface Upazila {
//   id: string;
//   name: string;
//   bn_name: string;
//   district_id: string;
//   unions: Union[];
// }

// export interface Union {
//   id: string;
//   name: string;
//   bn_name: string;
//   upazila_id: string;
// }

// export const bangladeshLocations: BangladeshLocation = {
//   divisions: [
//     {
//       id: "div-1",
//       name: "Dhaka",
//       bn_name: "ঢাকা",
//       districts: [
//         {
//           id: "dis-1",
//           name: "Dhaka",
//           bn_name: "ঢাকা",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-1",
//               name: "Dhamrai",
//               bn_name: "ধামরাই",
//               district_id: "dis-1",
//               unions: [
//                 { id: "uni-1", name: "Dhamrai", bn_name: "ধামরাই", upazila_id: "upa-1" },
//                 { id: "uni-2", name: "Amta", bn_name: "আমতা", upazila_id: "upa-1" },
//                 { id: "uni-3", name: "Baisakanda", bn_name: "বাইশকান্দা", upazila_id: "upa-1" },
//                 { id: "uni-4", name: "Balia", bn_name: "বালিয়া", upazila_id: "upa-1" },
//                 { id: "uni-5", name: "Bhararia", bn_name: "ভারারিয়া", upazila_id: "upa-1" },
//                 { id: "uni-6", name: "Chauhat", bn_name: "চৌহাট", upazila_id: "upa-1" },
//                 { id: "uni-7", name: "Dhamrai", bn_name: "ধামরাই", upazila_id: "upa-1" },
//                 { id: "uni-8", name: "Gangutia", bn_name: "গাংগুটিয়া", upazila_id: "upa-1" },
//                 { id: "uni-9", name: "Jadabpur", bn_name: "যাদবপুর", upazila_id: "upa-1" },
//                 { id: "uni-10", name: "Kailail", bn_name: "কৈলাইল", upazila_id: "upa-1" },
//                 { id: "uni-11", name: "Kulla", bn_name: "কুল্লা", upazila_id: "upa-1" },
//                 { id: "uni-12", name: "Kushura", bn_name: "কুশুরা", upazila_id: "upa-1" },
//                 { id: "uni-13", name: "Nannar", bn_name: "নান্নার", upazila_id: "upa-1" },
//                 { id: "uni-14", name: "Rowail", bn_name: "রোয়াইল", upazila_id: "upa-1" },
//                 { id: "uni-15", name: "Sanora", bn_name: "সানোড়া", upazila_id: "upa-1" },
//                 { id: "uni-16", name: "Sombhag", bn_name: "সম্ভাগ", upazila_id: "upa-1" },
//                 { id: "uni-17", name: "Sutipara", bn_name: "সূতিপাড়া", upazila_id: "upa-1" },
//                 { id: "uni-18", name: "Sutarpara", bn_name: "সুতারপাড়া", upazila_id: "upa-1" }
//               ]
//             },
//             {
//               id: "upa-2",
//               name: "Dohar",
//               bn_name: "দোহার",
//               district_id: "dis-1",
//               unions: [
//                 { id: "uni-19", name: "Bilaspur", bn_name: "বিলাসপুর", upazila_id: "upa-2" },
//                 { id: "uni-20", name: "Dohar", bn_name: "দোহার", upazila_id: "upa-2" },
//                 { id: "uni-21", name: "Kushumhati", bn_name: "কুশুমহাটি", upazila_id: "upa-2" },
//                 { id: "uni-22", name: "Mahmudpur", bn_name: "মাহমুদপুর", upazila_id: "upa-2" },
//                 { id: "uni-23", name: "Muksudpur", bn_name: "মুকসুদপুর", upazila_id: "upa-2" },
//                 { id: "uni-24", name: "Narisha", bn_name: "নারিশা", upazila_id: "upa-2" },
//                 { id: "uni-25", name: "Nayabari", bn_name: "নয়াবাড়ী", upazila_id: "upa-2" },
//                 { id: "uni-26", name: "Roypura", bn_name: "রায়পুরা", upazila_id: "upa-2" },
//                 { id: "uni-27", name: "Sutarpara", bn_name: "সুতারপাড়া", upazila_id: "upa-2" }
//               ]
//             },
//             {
//               id: "upa-3",
//               name: "Keraniganj",
//               bn_name: "কেরানীগঞ্জ",
//               district_id: "dis-1",
//               unions: [
//                 { id: "uni-28", name: "Aganagar", bn_name: "আগানগর", upazila_id: "upa-3" },
//                 { id: "uni-29", name: "Basta", bn_name: "বাস্তা", upazila_id: "upa-3" },
//                 { id: "uni-30", name: "Hazratpur", bn_name: "হযরতপুর", upazila_id: "upa-3" },
//                 { id: "uni-31", name: "Kalindi", bn_name: "কালিন্দী", upazila_id: "upa-3" },
//                 { id: "uni-32", name: "Kalatia", bn_name: "কলাতিয়া", upazila_id: "upa-3" },
//                 { id: "uni-33", name: "Konda", bn_name: "কোন্ডা", upazila_id: "upa-3" },
//                 { id: "uni-34", name: "Ruhitpur", bn_name: "রোহিতপুর", upazila_id: "upa-3" },
//                 { id: "uni-35", name: "Sakta", bn_name: "শাক্তা", upazila_id: "upa-3" },
//                 { id: "uni-36", name: "Taranagar", bn_name: "তারানগর", upazila_id: "upa-3" },
//                 { id: "uni-37", name: "Zinzira", bn_name: "জিনজিরা", upazila_id: "upa-3" }
//               ]
//             },
//             {
//               id: "upa-4",
//               name: "Nawabganj",
//               bn_name: "নবাবগঞ্জ",
//               district_id: "dis-1",
//               unions: [
//                 { id: "uni-38", name: "Agla", bn_name: "আগলা", upazila_id: "upa-4" },
//                 { id: "uni-39", name: "Bakshanagar", bn_name: "বক্সনগর", upazila_id: "upa-4" },
//                 { id: "uni-40", name: "Bandura", bn_name: "বান্দুরা", upazila_id: "upa-4" },
//                 { id: "uni-41", name: "Baruakhali", bn_name: "বারুয়াখালী", upazila_id: "upa-4" },
//                 { id: "uni-42", name: "Churain", bn_name: "চুড়াইন", upazila_id: "upa-4" },
//                 { id: "uni-43", name: "Galimpur", bn_name: "গালিমপুর", upazila_id: "upa-4" },
//                 { id: "uni-44", name: "Jantrail", bn_name: "যন্ত্রাইল", upazila_id: "upa-4" },
//                 { id: "uni-45", name: "Kailail", bn_name: "কৈলাইল", upazila_id: "upa-4" },
//                 { id: "uni-46", name: "Khalpar", bn_name: "খালপাড়", upazila_id: "upa-4" },
//                 { id: "uni-47", name: "Kushura", bn_name: "কুশুরা", upazila_id: "upa-4" },
//                 { id: "uni-48", name: "Nayansree", bn_name: "নয়নশ্রী", upazila_id: "upa-4" },
//                 { id: "uni-49", name: "Shikari Para", bn_name: "শিকারীপাড়া", upazila_id: "upa-4" }
//               ]
//             },
//             {
//               id: "upa-5",
//               name: "Savar",
//               bn_name: "সাভার",
//               district_id: "dis-1",
//               unions: [
//                 { id: "uni-50", name: "Amin Bazar", bn_name: "আমিন বাজার", upazila_id: "upa-5" },
//                 { id: "uni-51", name: "Ashulia", bn_name: "আশুলিয়া", upazila_id: "upa-5" },
//                 { id: "uni-52", name: "Banagram", bn_name: "বনগ্রাম", upazila_id: "upa-5" },
//                 { id: "uni-53", name: "Bongaon", bn_name: "বনগাঁও", upazila_id: "upa-5" },
//                 { id: "uni-54", name: "Dhamsona", bn_name: "ধামসোনা", upazila_id: "upa-5" },
//                 { id: "uni-55", name: "Kaundia", bn_name: "কাউন্দিয়া", upazila_id: "upa-5" },
//                 { id: "uni-56", name: "Pathalia", bn_name: "পাথালিয়া", upazila_id: "upa-5" },
//                 { id: "uni-57", name: "Savar", bn_name: "সাভার", upazila_id: "upa-5" },
//                 { id: "uni-58", name: "Shimulia", bn_name: "শিমুলিয়া", upazila_id: "upa-5" },
//                 { id: "uni-59", name: "Tetuljhora", bn_name: "তেতুলঝোরা", upazila_id: "upa-5" },
//                 { id: "uni-60", name: "Yearpur", bn_name: "ইয়ারপুর", upazila_id: "upa-5" }
//               ]
//             }
//           ]
//         },
//         {
//           id: "dis-2",
//           name: "Faridpur",
//           bn_name: "ফরিদপুর",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-6",
//               name: "Faridpur Sadar",
//               bn_name: "ফরিদপুর সদর",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-61", name: "Aliabad", bn_name: "আলিয়াবাদ", upazila_id: "upa-6" },
//                 { id: "uni-62", name: "Ambikapur", bn_name: "অম্বিকাপুর", upazila_id: "upa-6" },
//                 { id: "uni-63", name: "Char Madhabdia", bn_name: "চর মাধবদিয়া", upazila_id: "upa-6" },
//                 { id: "uni-64", name: "Decreerchar", bn_name: "ডিক্রীরচর", upazila_id: "upa-6" },
//                 { id: "uni-65", name: "Faridpur", bn_name: "ফরিদপুর", upazila_id: "upa-6" },
//                 { id: "uni-66", name: "Greda", bn_name: "গ্রেডা", upazila_id: "upa-6" },
//                 { id: "uni-67", name: "Ishan Gopalpur", bn_name: "ঈশান গোপালপুর", upazila_id: "upa-6" },
//                 { id: "uni-68", name: "Kaijuri", bn_name: "কাইজুরী", upazila_id: "upa-6" },
//                 { id: "uni-69", name: "Kanaipur", bn_name: "কানাইপুর", upazila_id: "upa-6" },
//                 { id: "uni-70", name: "Krishnanagar", bn_name: "কৃষ্ণনগর", upazila_id: "upa-6" },
//                 { id: "uni-71", name: "Majchar", bn_name: "মাজচর", upazila_id: "upa-6" },
//                 { id: "uni-72", name: "Uttar Channel", bn_name: "উত্তর চ্যানেল", upazila_id: "upa-6" }
//               ]
//             },
//             {
//               id: "upa-7",
//               name: "Bhanga",
//               bn_name: "ভাঙ্গা",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-73", name: "Algi", bn_name: "আলগী", upazila_id: "upa-7" },
//                 { id: "uni-74", name: "Azimnagar", bn_name: "আজিমনগর", upazila_id: "upa-7" },
//                 { id: "uni-75", name: "Bhanga", bn_name: "ভাঙ্গা", upazila_id: "upa-7" },
//                 { id: "uni-76", name: "Chandra", bn_name: "চান্দ্রা", upazila_id: "upa-7" },
//                 { id: "uni-77", name: "Chumurdi", bn_name: "চুমুরদী", upazila_id: "upa-7" },
//                 { id: "uni-78", name: "Gharua", bn_name: "ঘারুয়া", upazila_id: "upa-7" },
//                 { id: "uni-79", name: "Hamirdi", bn_name: "হামিরদী", upazila_id: "upa-7" },
//                 { id: "uni-80", name: "Kalamridha", bn_name: "কালামৃধা", upazila_id: "upa-7" },
//                 { id: "uni-81", name: "Kaoliber", bn_name: "কাওলিবেড়", upazila_id: "upa-7" },
//                 { id: "uni-82", name: "Krishnapur", bn_name: "কৃষ্ণপুর", upazila_id: "upa-7" },
//                 { id: "uni-83", name: "Narikel Baria", bn_name: "নারিকেলবাড়িয়া", upazila_id: "upa-7" },
//                 { id: "uni-84", name: "Nurullaganj", bn_name: "নুরুল্লাগঞ্জ", upazila_id: "upa-7" },
//                 { id: "uni-85", name: "Tujarpur", bn_name: "তুজারপুর", upazila_id: "upa-7" }
//               ]
//             },
//             {
//               id: "upa-8",
//               name: "Boalmari",
//               bn_name: "বোয়ালমারী",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-86", name: "Boalmari", bn_name: "বোয়ালমারী", upazila_id: "upa-8" },
//                 { id: "uni-87", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-8" },
//                 { id: "uni-88", name: "Chatul", bn_name: "চাতুল", upazila_id: "upa-8" },
//                 { id: "uni-89", name: "Dadpur", bn_name: "দাদপুর", upazila_id: "upa-8" },
//                 { id: "uni-90", name: "Ghoshpur", bn_name: "ঘোষপুর", upazila_id: "upa-8" },
//                 { id: "uni-91", name: "Gunbaha", bn_name: "গুনবহা", upazila_id: "upa-8" },
//                 { id: "uni-92", name: "Moyen Sreenagar", bn_name: "ময়েন শ্রীনগর", upazila_id: "upa-8" },
//                 { id: "uni-93", name: "Parameshwardi", bn_name: "পরমেশ্বরদী", upazila_id: "upa-8" },
//                 { id: "uni-94", name: "Rupapat", bn_name: "রূপপাট", upazila_id: "upa-8" },
//                 { id: "uni-95", name: "Satair", bn_name: "সাতৈর", upazila_id: "upa-8" }
//               ]
//             },
//             {
//               id: "upa-9",
//               name: "Alfadanga",
//               bn_name: "আলফাডাঙ্গা",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-96", name: "Alfadanga", bn_name: "আলফাডাঙ্গা", upazila_id: "upa-9" },
//                 { id: "uni-97", name: "Bana", bn_name: "বানা", upazila_id: "upa-9" },
//                 { id: "uni-98", name: "Buraich", bn_name: "বুড়াইচ", upazila_id: "upa-9" },
//                 { id: "uni-99", name: "Gopalpur", bn_name: "গোপালপুর", upazila_id: "upa-9" },
//                 { id: "uni-100", name: "Panchuria", bn_name: "পাঁচুড়িয়া", upazila_id: "upa-9" },
//                 { id: "uni-101", name: "Tagarbanda", bn_name: "টগরবন্দ", upazila_id: "upa-9" }
//               ]
//             },
//             {
//               id: "upa-10",
//               name: "Madhukhali",
//               bn_name: "মধুখালী",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-102", name: "Bagat", bn_name: "বাগাট", upazila_id: "upa-10" },
//                 { id: "uni-103", name: "Dumain", bn_name: "ডুমাইন", upazila_id: "upa-10" },
//                 { id: "uni-104", name: "Gazirtek", bn_name: "গাজীরটেক", upazila_id: "upa-10" },
//                 { id: "uni-105", name: "Jahapur", bn_name: "জাহাপুর", upazila_id: "upa-10" },
//                 { id: "uni-106", name: "Kamarkhali", bn_name: "কামারখালী", upazila_id: "upa-10" },
//                 { id: "uni-107", name: "Madhukhali", bn_name: "মধুখালী", upazila_id: "upa-10" },
//                 { id: "uni-108", name: "Megchami", bn_name: "মেগচামী", upazila_id: "upa-10" },
//                 { id: "uni-109", name: "Noongola", bn_name: "নুনগলা", upazila_id: "upa-10" }
//               ]
//             },
//             {
//               id: "upa-11",
//               name: "Nagarkanda",
//               bn_name: "নগরকান্দা",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-110", name: "Chandra", bn_name: "চান্দ্রা", upazila_id: "upa-11" },
//                 { id: "uni-111", name: "Gatti", bn_name: "গট্টি", upazila_id: "upa-11" },
//                 { id: "uni-112", name: "Jadunandi", bn_name: "যদুনন্দী", upazila_id: "upa-11" },
//                 { id: "uni-113", name: "Kalamridha", bn_name: "কালামৃধা", upazila_id: "upa-11" },
//                 { id: "uni-114", name: "Kawlibera", bn_name: "কাওলিবেড়া", upazila_id: "upa-11" },
//                 { id: "uni-115", name: "Nagarkanda", bn_name: "নগরকান্দা", upazila_id: "upa-11" },
//                 { id: "uni-116", name: "Talma", bn_name: "তালমা", upazila_id: "upa-11" },
//                 { id: "uni-117", name: "Uttar Ramkrishnapur", bn_name: "উত্তর রামকৃষ্ণপুর", upazila_id: "upa-11" }
//               ]
//             },
//             {
//               id: "upa-12",
//               name: "Charbhadrasan",
//               bn_name: "চরভদ্রাসন",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-118", name: "Bhashanchar", bn_name: "ভাষানচর", upazila_id: "upa-12" },
//                 { id: "uni-119", name: "Char Bhadrasan", bn_name: "চর ভদ্রাসন", upazila_id: "upa-12" },
//                 { id: "uni-120", name: "Char Harirampur", bn_name: "চর হরিরামপুর", upazila_id: "upa-12" },
//                 { id: "uni-121", name: "Char Jhukunda", bn_name: "চর ঝুকুন্ডা", upazila_id: "upa-12" },
//                 { id: "uni-122", name: "Gazaria", bn_name: "গজারিয়া", upazila_id: "upa-12" }
//               ]
//             },
//             {
//               id: "upa-13",
//               name: "Sadarpur",
//               bn_name: "সদরপুর",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-123", name: "Bhashanchar", bn_name: "ভাষানচর", upazila_id: "upa-13" },
//                 { id: "uni-124", name: "Char Manair", bn_name: "চর মানাইর", upazila_id: "upa-13" },
//                 { id: "uni-125", name: "Dheukhali", bn_name: "ঢেউখালী", upazila_id: "upa-13" },
//                 { id: "uni-126", name: "Krishnapur", bn_name: "কৃষ্ণপুর", upazila_id: "upa-13" },
//                 { id: "uni-127", name: "Patgati", bn_name: "পাটগাতী", upazila_id: "upa-13" }
//               ]
//             },
//             {
//               id: "upa-14",
//               name: "Saltha",
//               bn_name: "সালথা",
//               district_id: "dis-2",
//               unions: [
//                 { id: "uni-128", name: "Ballabhdi", bn_name: "বল্লভদী", upazila_id: "upa-14" },
//                 { id: "uni-129", name: "Islampur", bn_name: "ইসলামপুর", upazila_id: "upa-14" },
//                 { id: "uni-130", name: "Kanaipur", bn_name: "কানাইপুর", upazila_id: "upa-14" },
//                 { id: "uni-131", name: "Kawlibera", bn_name: "কাওলিবেড়া", upazila_id: "upa-14" },
//                 { id: "uni-132", name: "Saltha", bn_name: "সালথা", upazila_id: "upa-14" },
//                 { id: "uni-133", name: "Sreerampur", bn_name: "শ্রীরামপুর", upazila_id: "upa-14" }
//               ]
//             }
//           ]
//         },
//         {
//           id: "dis-3",
//           name: "Gazipur",
//           bn_name: "গাজীপুর",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-15",
//               name: "Gazipur Sadar",
//               bn_name: "গাজীপুর সদর",
//               district_id: "dis-3",
//               unions: [
//                 { id: "uni-134", name: "Baria", bn_name: "বাড়ীয়া", upazila_id: "upa-15" },
//                 { id: "uni-135", name: "Basan", bn_name: "বাসন", upazila_id: "upa-15" },
//                 { id: "uni-136", name: "Gachha", bn_name: "গাছা", upazila_id: "upa-15" },
//                 { id: "uni-137", name: "Gazipur", bn_name: "গাজীপুর", upazila_id: "upa-15" },
//                 { id: "uni-138", name: "Kashimpur", bn_name: "কাশিমপুর", upazila_id: "upa-15" },
//                 { id: "uni-139", name: "Konabari", bn_name: "কোনাবাড়ী", upazila_id: "upa-15" },
//                 { id: "uni-140", name: "Mirzapur", bn_name: "মির্জাপুর", upazila_id: "upa-15" },
//                 { id: "uni-141", name: "Pubail", bn_name: "পূবাইল", upazila_id: "upa-15" },
//                 { id: "uni-142", name: "Tongi", bn_name: "টঙ্গী", upazila_id: "upa-15" }
//               ]
//             },
//             {
//               id: "upa-16",
//               name: "Kaliakair",
//               bn_name: "কালিয়াকৈর",
//               district_id: "dis-3",
//               unions: [
//                 { id: "uni-143", name: "Atabaha", bn_name: "আটাবহ", upazila_id: "upa-16" },
//                 { id: "uni-144", name: "Boali", bn_name: "বোয়ালী", upazila_id: "upa-16" },
//                 { id: "uni-145", name: "Chapair", bn_name: "চাপাইর", upazila_id: "upa-16" },
//                 { id: "uni-146", name: "Dhaliora", bn_name: "ঢালজোড়া", upazila_id: "upa-16" },
//                 { id: "uni-147", name: "Fulbaria", bn_name: "ফুলবাড়ীয়া", upazila_id: "upa-16" },
//                 { id: "uni-148", name: "Kaliakair", bn_name: "কালিয়াকৈর", upazila_id: "upa-16" },
//                 { id: "uni-149", name: "Mouchak", bn_name: "মৌচাক", upazila_id: "upa-16" },
//                 { id: "uni-150", name: "Sreefaltali", bn_name: "শ্রীফলতলী", upazila_id: "upa-16" },
//                 { id: "uni-151", name: "Sutrapur", bn_name: "সুত্রাপুর", upazila_id: "upa-16" }
//               ]
//             },
//             {
//               id: "upa-17",
//               name: "Kaliganj",
//               bn_name: "কালীগঞ্জ",
//               district_id: "dis-3",
//               unions: [
//                 { id: "uni-152", name: "Baktarpur", bn_name: "বক্তারপুর", upazila_id: "upa-17" },
//                 { id: "uni-153", name: "Jamalpur", bn_name: "জামালপুর", upazila_id: "upa-17" },
//                 { id: "uni-154", name: "Kaliganj", bn_name: "কালীগঞ্জ", upazila_id: "upa-17" },
//                 { id: "uni-155", name: "Moktarpur", bn_name: "মোক্তারপুর", upazila_id: "upa-17" },
//                 { id: "uni-156", name: "Nagari", bn_name: "নাগরী", upazila_id: "upa-17" },
//                 { id: "uni-157", name: "Tumulia", bn_name: "তুমুলিয়া", upazila_id: "upa-17" }
//               ]
//             },
//             {
//               id: "upa-18",
//               name: "Kapasia",
//               bn_name: "কাপাসিয়া",
//               district_id: "dis-3",
//               unions: [
//                 { id: "uni-158", name: "Barishaba", bn_name: "বারিষাব", upazila_id: "upa-18" },
//                 { id: "uni-159", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-18" },
//                 { id: "uni-160", name: "Durgapur", bn_name: "দুর্গাপুর", upazila_id: "upa-18" },
//                 { id: "uni-161", name: "Ghagotia", bn_name: "ঘাগটিয়া", upazila_id: "upa-18" },
//                 { id: "uni-162", name: "Karihata", bn_name: "কারীহাটা", upazila_id: "upa-18" },
//                 { id: "uni-163", name: "Kashimpur", bn_name: "কাশিমপুর", upazila_id: "upa-18" },
//                                 { id: "uni-164", name: "Kheruajani", bn_name: "খেরুয়াজানী", upazila_id: "upa-18" },
//                 { id: "uni-165", name: "Rayed", bn_name: "রায়েদ", upazila_id: "upa-18" },
//                 { id: "uni-166", name: "Sanmania", bn_name: "সানমানিয়া", upazila_id: "upa-18" },
//                 { id: "uni-167", name: "Singhasree", bn_name: "সিংহশ্রী", upazila_id: "upa-18" },
//                 { id: "uni-168", name: "Targaon", bn_name: "তরগাঁও", upazila_id: "upa-18" },
//                 { id: "uni-169", name: "Toke", bn_name: "টোক", upazila_id: "upa-18" }
//               ]
//             },
//             {
//               id: "upa-19",
//               name: "Sreepur",
//               bn_name: "শ্রীপুর",
//               district_id: "dis-3",
//               unions: [
//                 { id: "uni-170", name: "Barmi", bn_name: "বরমী", upazila_id: "upa-19" },
//                 { id: "uni-171", name: "Gazipur", bn_name: "গাজীপুর", upazila_id: "upa-19" },
//                 { id: "uni-172", name: "Gosinga", bn_name: "গোসিংগা", upazila_id: "upa-19" },
//                 { id: "uni-173", name: "Kaoraid", bn_name: "কাওরাইদ", upazila_id: "upa-19" },
//                 { id: "uni-174", name: "Maona", bn_name: "মাওনা", upazila_id: "upa-19" },
//                 { id: "uni-175", name: "Prahladpur", bn_name: "প্রহলাদপুর", upazila_id: "upa-19" },
//                 { id: "uni-176", name: "Rajabari", bn_name: "রাজাবাড়ী", upazila_id: "upa-19" },
//                 { id: "uni-177", name: "Sreepur", bn_name: "শ্রীপুর", upazila_id: "upa-19" },
//                 { id: "uni-178", name: "Telihati", bn_name: "তেলিহাটী", upazila_id: "upa-19" }
//               ]
//             }
//           ]
//         },
//         {
//           id: "dis-4",
//           name: "Gopalganj",
//           bn_name: "গোপালগঞ্জ",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-20",
//               name: "Gopalganj Sadar",
//               bn_name: "গোপালগঞ্জ সদর",
//               district_id: "dis-4",
//               unions: [
//                 { id: "uni-179", name: "Batikamari", bn_name: "বাটিকামারী", upazila_id: "upa-20" },
//                 { id: "uni-180", name: "Gopinathpur", bn_name: "গোপীনাথপুর", upazila_id: "upa-20" },
//                 { id: "uni-181", name: "Gopalganj", bn_name: "গোপালগঞ্জ", upazila_id: "upa-20" },
//                 { id: "uni-182", name: "Haridaspur", bn_name: "হরিদাসপুর", upazila_id: "upa-20" },
//                 { id: "uni-183", name: "Jalirpar", bn_name: "জালিরপাড়", upazila_id: "upa-20" },
//                 { id: "uni-184", name: "Kashiani", bn_name: "কাশিয়ানী", upazila_id: "upa-20" },
//                 { id: "uni-185", name: "Kotalipara", bn_name: "কোটালীপাড়া", upazila_id: "upa-20" },
//                 { id: "uni-186", name: "Kushli", bn_name: "কুশলী", upazila_id: "upa-20" },
//                 { id: "uni-187", name: "Maksudpur", bn_name: "মকসুদপুর", upazila_id: "upa-20" },
//                 { id: "uni-188", name: "Manoharpur", bn_name: "মনোহরপুর", upazila_id: "upa-20" },
//                 { id: "uni-189", name: "Raghdi", bn_name: "রাঘদী", upazila_id: "upa-20" },
//                 { id: "uni-190", name: "Ulpur", bn_name: "উলপুর", upazila_id: "upa-20" },
//                 { id: "uni-191", name: "Urafi", bn_name: "উরফী", upazila_id: "upa-20" }
//               ]
//             },
//             {
//               id: "upa-21",
//               name: "Kashiani",
//               bn_name: "কাশিয়ানী",
//               district_id: "dis-4",
//               unions: [
//                 { id: "uni-192", name: "Hatiya", bn_name: "হাটিয়া", upazila_id: "upa-21" },
//                 { id: "uni-193", name: "Kashiani", bn_name: "কাশিয়ানী", upazila_id: "upa-21" },
//                 { id: "uni-194", name: "Orakandia", bn_name: "ওড়াকান্দি", upazila_id: "upa-21" },
//                 { id: "uni-195", name: "Parulia", bn_name: "পারুলিয়া", upazila_id: "upa-21" },
//                 { id: "uni-196", name: "Raghdi", bn_name: "রাঘদী", upazila_id: "upa-21" },
//                 { id: "uni-197", name: "Singa", bn_name: "সিংগা", upazila_id: "upa-21" }
//               ]
//             },
//             {
//               id: "upa-22",
//               name: "Kotalipara",
//               bn_name: "কোটালীপাড়া",
//               district_id: "dis-4",
//               unions: [
//                 { id: "uni-198", name: "Amdaha", bn_name: "আমদহা", upazila_id: "upa-22" },
//                 { id: "uni-199", name: "Bandhabari", bn_name: "বন্ধবাড়ী", upazila_id: "upa-22" },
//                 { id: "uni-200", name: "Gopinathpur", bn_name: "গোপীনাথপুর", upazila_id: "upa-22" },
//                 { id: "uni-201", name: "Kotalipara", bn_name: "কোটালীপাড়া", upazila_id: "upa-22" },
//                 { id: "uni-202", name: "Kushla", bn_name: "কুশলা", upazila_id: "upa-22" },
//                 { id: "uni-203", name: "Pinjuri", bn_name: "পিঞ্জুরী", upazila_id: "upa-22" },
//                 { id: "uni-204", name: "Radhaganj", bn_name: "রাধাগঞ্জ", upazila_id: "upa-22" },
//                 { id: "uni-205", name: "Ramshil", bn_name: "রামশীল", upazila_id: "upa-22" }
//               ]
//             },
//             {
//               id: "upa-23",
//               name: "Muksudpur",
//               bn_name: "মুকসুদপুর",
//               district_id: "dis-4",
//               unions: [
//                 { id: "uni-206", name: "Bahugram", bn_name: "বাহুগ্রাম", upazila_id: "upa-23" },
//                 { id: "uni-207", name: "Bohar", bn_name: "বহর", upazila_id: "upa-23" },
//                 { id: "uni-208", name: "Gopalganj", bn_name: "গোপালগঞ্জ", upazila_id: "upa-23" },
//                 { id: "uni-209", name: "Kathuli", bn_name: "কাঠুলী", upazila_id: "upa-23" },
//                 { id: "uni-210", name: "Kazirchar", bn_name: "কাজীরচর", upazila_id: "upa-23" },
//                 { id: "uni-211", name: "Maheshpur", bn_name: "মহেশপুর", upazila_id: "upa-23" },
//                 { id: "uni-212", name: "Nizra", bn_name: "নিজরা", upazila_id: "upa-23" },
//                 { id: "uni-213", name: "Purapara", bn_name: "পুরাপাড়া", upazila_id: "upa-23" },
//                 { id: "uni-214", name: "Raghdi", bn_name: "রাঘদী", upazila_id: "upa-23" }
//               ]
//             },
//             {
//               id: "upa-24",
//               name: "Tungipara",
//               bn_name: "টুঙ্গিপাড়া",
//               district_id: "dis-4",
//               unions: [
//                 { id: "uni-215", name: "Dumuria", bn_name: "ডুমুরিয়া", upazila_id: "upa-24" },
//                 { id: "uni-216", name: "Gopalpur", bn_name: "গোপালপুর", upazila_id: "upa-24" },
//                 { id: "uni-217", name: "Kochua", bn_name: "কচুয়া", upazila_id: "upa-24" },
//                 { id: "uni-218", name: "Panishwar", bn_name: "পানিশ্বর", upazila_id: "upa-24" },
//                 { id: "uni-219", name: "Tungipara", bn_name: "টুঙ্গিপাড়া", upazila_id: "upa-24" }
//               ]
//             }
//           ]
//         },
//         {
//           id: "dis-5",
//           name: "Kishoreganj",
//           bn_name: "কিশোরগঞ্জ",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-25",
//               name: "Kishoreganj Sadar",
//               bn_name: "কিশোরগঞ্জ সদর",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-220", name: "Balla", bn_name: "বাল্লা", upazila_id: "upa-25" },
//                 { id: "uni-221", name: "Binnati", bn_name: "বিন্নাটি", upazila_id: "upa-25" },
//                 { id: "uni-222", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-25" },
//                 { id: "uni-223", name: "Dilalpur", bn_name: "দিলালপুর", upazila_id: "upa-25" },
//                 { id: "uni-224", name: "Gobindapur", bn_name: "গোবিন্দপুর", upazila_id: "upa-25" },
//                 { id: "uni-225", name: "Jasodal", bn_name: "যশোদল", upazila_id: "upa-25" },
//                 { id: "uni-226", name: "Kishoreganj", bn_name: "কিশোরগঞ্জ", upazila_id: "upa-25" },
//                 { id: "uni-227", name: "Korsha Kariail", bn_name: "কর্শা করিয়াইল", upazila_id: "upa-25" },
//                 { id: "uni-228", name: "Latibabad", bn_name: "লতিবাবাদ", upazila_id: "upa-25" },
//                 { id: "uni-229", name: "Mahinanda", bn_name: "মহিনন্দ", upazila_id: "upa-25" },
//                 { id: "uni-230", name: "Maizhati", bn_name: "মাইজহাটি", upazila_id: "upa-25" },
//                 { id: "uni-231", name: "Maria", bn_name: "মারিয়া", upazila_id: "upa-25" },
//                 { id: "uni-232", name: "Rashidabad", bn_name: "রশিদাবাদ", upazila_id: "upa-25" },
//                 { id: "uni-233", name: "Sadia Chandpur", bn_name: "সদিয়া চাঁদপুর", upazila_id: "upa-25" },
//                 { id: "uni-234", name: "Sidhla", bn_name: "সিদলা", upazila_id: "upa-25" }
//               ]
//             },
//             {
//               id: "upa-26",
//               name: "Austagram",
//               bn_name: "অষ্টগ্রাম",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-235", name: "Adampur", bn_name: "আদমপুর", upazila_id: "upa-26" },
//                 { id: "uni-236", name: "Austagram", bn_name: "অষ্টগ্রাম", upazila_id: "upa-26" },
//                 { id: "uni-237", name: "Bangalpara", bn_name: "বাঙ্গালপাড়া", upazila_id: "upa-26" },
//                 { id: "uni-238", name: "Deoghar", bn_name: "দেওঘর", upazila_id: "upa-26" },
//                 { id: "uni-239", name: "Kalian", bn_name: "কালিয়ান", upazila_id: "upa-26" },
//                 { id: "uni-240", name: "Purba Austagram", bn_name: "পূর্ব অষ্টগ্রাম", upazila_id: "upa-26" }
//               ]
//             },
//             {
//               id: "upa-27",
//               name: "Bajitpur",
//               bn_name: "বাজিতপুর",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-241", name: "Bajitpur", bn_name: "বাজিতপুর", upazila_id: "upa-27" },
//                 { id: "uni-242", name: "Dighirpar", bn_name: "দিঘীরপাড়", upazila_id: "upa-27" },
//                 { id: "uni-243", name: "Dilalpur", bn_name: "দিলালপুর", upazila_id: "upa-27" },
//                 { id: "uni-244", name: "Gazirchar", bn_name: "গাজীরচর", upazila_id: "upa-27" },
//                 { id: "uni-245", name: "Halimpur", bn_name: "হালিমপুর", upazila_id: "upa-27" },
//                 { id: "uni-246", name: "Hilochia", bn_name: "হিলোচিয়া", upazila_id: "upa-27" },
//                 { id: "uni-247", name: "Humaipur", bn_name: "হুমাইপুর", upazila_id: "upa-27" },
//                 { id: "uni-248", name: "Kailag", bn_name: "কাইলাগ", upazila_id: "upa-27" },
//                 { id: "uni-249", name: "Maizhati", bn_name: "মাইজহাটি", upazila_id: "upa-27" },
//                 { id: "uni-250", name: "Pirijpur", bn_name: "পিরিজপুর", upazila_id: "upa-27" },
//                 { id: "uni-251", name: "Sararchar", bn_name: "সরারচর", upazila_id: "upa-27" }
//               ]
//             },
//             {
//               id: "upa-28",
//               name: "Bhairab",
//               bn_name: "ভৈরব",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-252", name: "Bhairab", bn_name: "ভৈরব", upazila_id: "upa-28" },
//                 { id: "uni-253", name: "Bhuban", bn_name: "ভুবন", upazila_id: "upa-28" },
//                 { id: "uni-254", name: "Biraimpur", bn_name: "বিরাইমপুর", upazila_id: "upa-28" },
//                 { id: "uni-255", name: "Kalika Prasad", bn_name: "কালিকা প্রসাদ", upazila_id: "upa-28" },
//                 { id: "uni-256", name: "Sadekpur", bn_name: "সাদেকপুর", upazila_id: "upa-28" },
//                 { id: "uni-257", name: "Shimulkandi", bn_name: "শিমুলকান্দি", upazila_id: "upa-28" }
//               ]
//             },
//             {
//               id: "upa-29",
//               name: "Hossainpur",
//               bn_name: "হোসেনপুর",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-258", name: "Araibaria", bn_name: "আড়াইবাড়িয়া", upazila_id: "upa-29" },
//                 { id: "uni-259", name: "Gobindapur", bn_name: "গোবিন্দপুর", upazila_id: "upa-29" },
//                 { id: "uni-260", name: "Hossainpur", bn_name: "হোসেনপুর", upazila_id: "upa-29" },
//                 { id: "uni-261", name: "Jinari", bn_name: "জিনারি", upazila_id: "upa-29" },
//                 { id: "uni-262", name: "Pumdi", bn_name: "পুমদি", upazila_id: "upa-29" },
//                 { id: "uni-263", name: "Sahedal", bn_name: "সাহেদাল", upazila_id: "upa-29" },
//                 { id: "uni-264", name: "Sidhla", bn_name: "সিদলা", upazila_id: "upa-29" }
//               ]
//             },
//             {
//               id: "upa-30",
//               name: "Itna",
//               bn_name: "ইটনা",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-265", name: "Badla", bn_name: "বদলা", upazila_id: "upa-30" },
//                 { id: "uni-266", name: "Baribari", bn_name: "বারীবাড়ী", upazila_id: "upa-30" },
//                 { id: "uni-267", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-30" },
//                 { id: "uni-268", name: "Dhanpur", bn_name: "ধানপুর", upazila_id: "upa-30" },
//                 { id: "uni-269", name: "Itna", bn_name: "ইটনা", upazila_id: "upa-30" },
//                 { id: "uni-270", name: "Joy Siddhi", bn_name: "জয় সিদ্ধি", upazila_id: "upa-30" },
//                 { id: "uni-271", name: "Mriga", bn_name: "মৃগা", upazila_id: "upa-30" }
//               ]
//             },
//             {
//               id: "upa-31",
//               name: "Karimganj",
//               bn_name: "করিমগঞ্জ",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-272", name: "Gujadia", bn_name: "গুজাদিয়া", upazila_id: "upa-31" },
//                 { id: "uni-273", name: "Jafarabad", bn_name: "জাফরাবাদ", upazila_id: "upa-31" },
//                 { id: "uni-274", name: "Joyka", bn_name: "জয়কা", upazila_id: "upa-31" },
//                 { id: "uni-275", name: "Kadir Jangal", bn_name: "কাদির জঙ্গল", upazila_id: "upa-31" },
//                 { id: "uni-276", name: "Karimganj", bn_name: "করিমগঞ্জ", upazila_id: "upa-31" },
//                 { id: "uni-277", name: "Kiraton", bn_name: "কিরাতন", upazila_id: "upa-31" },
//                 { id: "uni-278", name: "Niamatpur", bn_name: "নিয়ামতপুর", upazila_id: "upa-31" },
//                 { id: "uni-279", name: "Noabad", bn_name: "নোয়াবাদ", upazila_id: "upa-31" },
//                 { id: "uni-280", name: "Sutar Para", bn_name: "সুতার পাড়া", upazila_id: "upa-31" }
//               ]
//             },
//             {
//               id: "upa-32",
//               name: "Katiadi",
//               bn_name: "কটিয়াদী",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-281", name: "Achmita", bn_name: "আচমিতা", upazila_id: "upa-32" },
//                 { id: "uni-282", name: "Banagram", bn_name: "বনগ্রাম", upazila_id: "upa-32" },
//                 { id: "uni-283", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-32" },
//                 { id: "uni-284", name: "Jalalpur", bn_name: "জালালপুর", upazila_id: "upa-32" },
//                 { id: "uni-285", name: "Katiadi", bn_name: "কটিয়াদী", upazila_id: "upa-32" },
//                 { id: "uni-286", name: "Masua", bn_name: "মাসুয়া", upazila_id: "upa-32" },
//                 { id: "uni-287", name: "Mumurdia", bn_name: "মুমুরদিয়া", upazila_id: "upa-32" },
//                 { id: "uni-288", name: "Shahasram Dhuldia", bn_name: "শাহাস্রাম ধুলদিয়া", upazila_id: "upa-32" }
//               ]
//             },
//             {
//               id: "upa-33",
//               name: "Kuliarchar",
//               bn_name: "কুলিয়ারচর",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-289", name: "Chhaysuti", bn_name: "ছয়সূতী", upazila_id: "upa-33" },
//                 { id: "uni-290", name: "Faridpur", bn_name: "ফরিদপুর", upazila_id: "upa-33" },
//                 { id: "uni-291", name: "Gobaria Abdullahpur", bn_name: "গোবরিয়া আব্দুল্লাহপুর", upazila_id: "upa-33" },
//                 { id: "uni-292", name: "Osmanpur", bn_name: "ওসমানপুর", upazila_id: "upa-33" },
//                 { id: "uni-293", name: "Ramdi", bn_name: "রামদী", upazila_id: "upa-33" },
//                 { id: "uni-294", name: "Salua", bn_name: "সলুয়া", upazila_id: "upa-33" }
//               ]
//             },
//             {
//               id: "upa-34",
//               name: "Mithamain",
//               bn_name: "মিঠামইন",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-295", name: "Bairati", bn_name: "বৈরাটি", upazila_id: "upa-34" },
//                 { id: "uni-296", name: "Dhala", bn_name: "ঢালা", upazila_id: "upa-34" },
//                 { id: "uni-297", name: "Ghagra", bn_name: "ঘাগড়া", upazila_id: "upa-34" },
//                 { id: "uni-298", name: "Mithamain", bn_name: "মিঠামইন", upazila_id: "upa-34" },
//                 { id: "uni-299", name: "Purakandulia", bn_name: "পুরাকান্দুলিয়া", upazila_id: "upa-34" }
//               ]
//             },
//             {
//               id: "upa-35",
//               name: "Nikli",
//               bn_name: "নিকলী",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-300", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-35" },
//                 { id: "uni-301", name: "Guroi", bn_name: "গুরই", upazila_id: "upa-35" },
//                 { id: "uni-302", name: "Jaraitala", bn_name: "জারইতলা", upazila_id: "upa-35" },
//                 { id: "uni-303", name: "Karpasha", bn_name: "কার্পাশা", upazila_id: "upa-35" },
//                 { id: "uni-304", name: "Nikli", bn_name: "নিকলী", upazila_id: "upa-35" },
//                 { id: "uni-305", name: "Singpur", bn_name: "সিংপুর", upazila_id: "upa-35" }
//               ]
//             },
//             {
//               id: "upa-36",
//               name: "Pakundia",
//               bn_name: "পাকুন্দিয়া",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-306", name: "Baliardi", bn_name: "বালিয়ার্দী", upazila_id: "upa-36" },
//                 { id: "uni-307", name: "Chhaysuti", bn_name: "ছয়সূতী", upazila_id: "upa-36" },
//                 { id: "uni-308", name: "Hosendi", bn_name: "হোসেনদী", upazila_id: "upa-36" },
//                 { id: "uni-309", name: "Jangalia", bn_name: "জাঙ্গালিয়া", upazila_id: "upa-36" },
//                 { id: "uni-310", name: "Narandi", bn_name: "নারান্দী", upazila_id: "upa-36" },
//                 { id: "uni-311", name: "Pakundia", bn_name: "পাকুন্দিয়া", upazila_id: "upa-36" },
//                 { id: "uni-312", name: "Patuabhanga", bn_name: "পাটুয়াভাঙ্গা", upazila_id: "upa-36" }
//               ]
//             },
//             {
//               id: "upa-37",
//               name: "Tarail",
//               bn_name: "তাড়াইল",
//               district_id: "dis-5",
//               unions: [
//                 { id: "uni-313", name: "Damiha", bn_name: "দামিহা", upazila_id: "upa-37" },
//                 { id: "uni-314", name: "Digdair", bn_name: "দিগদাইর", upazila_id: "upa-37" },
//                 { id: "uni-315", name: "Dhola", bn_name: "ঢোলা", upazila_id: "upa-37" },
//                 { id: "uni-316", name: "Jawar", bn_name: "জাওয়ার", upazila_id: "upa-37" },
//                 { id: "uni-317", name: "Rauti", bn_name: "রাউতি", upazila_id: "upa-37" },
//                 { id: "uni-318", name: "Tarail", bn_name: "তাড়াইল", upazila_id: "upa-37" }
//               ]
//             }
//           ]
//         },
//          {
//           id: "dis-6",
//           name: "Madaripur",
//           bn_name: "মাদারীপুর",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-38",
//               name: "Madaripur Sadar",
//               bn_name: "মাদারীপুর সদর",
//               district_id: "dis-6",
//               unions: [
//                 { id: "uni-319", name: "Baligram", bn_name: "বালিগ্রাম", upazila_id: "upa-38" },
//                 { id: "uni-320", name: "Basail", bn_name: "বাসাইল", upazila_id: "upa-38" },
//                 { id: "uni-321", name: "Betila", bn_name: "বেতিলা", upazila_id: "upa-38" },
//                 { id: "uni-322", name: "Dhankora", bn_name: "ধানকোড়া", upazila_id: "upa-38" },
//                 { id: "uni-323", name: "Dhurail", bn_name: "ধুরাইল", upazila_id: "upa-38" },
//                 { id: "uni-324", name: "Gajadia", bn_name: "গজারিয়া", upazila_id: "upa-38" },
//                 { id: "uni-325", name: "Kadambari", bn_name: "কদমবাড়ী", upazila_id: "upa-38" },
//                 { id: "uni-326", name: "Khoajpur", bn_name: "খোয়াজপুর", upazila_id: "upa-38" },
//                 { id: "uni-327", name: "Kunia", bn_name: "কুনিয়া", upazila_id: "upa-38" },
//                 { id: "uni-328", name: "Madaripur", bn_name: "মাদারীপুর", upazila_id: "upa-38" },
//                 { id: "uni-329", name: "Mustafapur", bn_name: "মুস্তাফাপুর", upazila_id: "upa-38" },
//                 { id: "uni-330", name: "Panchkhola", bn_name: "পাঁচখোলা", upazila_id: "upa-38" },
//                 { id: "uni-331", name: "Rasti", bn_name: "রাস্তি", upazila_id: "upa-38" },
//                 { id: "uni-332", name: "Shibchar", bn_name: "শিবচর", upazila_id: "upa-38" }
//               ]
//             },
//             {
//               id: "upa-39",
//               name: "Kalkini",
//               bn_name: "কালকিনি",
//               district_id: "dis-6",
//               unions: [
//                 { id: "uni-333", name: "Baushia", bn_name: "বাউশিয়া", upazila_id: "upa-39" },
//                 { id: "uni-334", name: "Bhaberchar", bn_name: "ভাবরচর", upazila_id: "upa-39" },
//                 { id: "uni-335", name: "Gopalpur", bn_name: "গোপালপুর", upazila_id: "upa-39" },
//                 { id: "uni-336", name: "Kalkini", bn_name: "কালকিনি", upazila_id: "upa-39" },
//                 { id: "uni-337", name: "Kazibakai", bn_name: "কাজীবাকাই", upazila_id: "upa-39" },
//                 { id: "uni-338", name: "Laxmipur", bn_name: "লক্ষ্মীপুর", upazila_id: "upa-39" },
//                 { id: "uni-339", name: "Sahabrampur", bn_name: "সাহাবরামপুর", upazila_id: "upa-39" },
//                 { id: "uni-340", name: "Shikar Mangal", bn_name: "শিকার মঙ্গল", upazila_id: "upa-39" }
//               ]
//             },
//             {
//               id: "upa-40",
//               name: "Rajoir",
//               bn_name: "রাজৈর",
//               district_id: "dis-6",
//               unions: [
//                 { id: "uni-341", name: "Badarpur", bn_name: "বদরপুর", upazila_id: "upa-40" },
//                 { id: "uni-342", name: "Banshkandi", bn_name: "বাঁশকান্দি", upazila_id: "upa-40" },
//                 { id: "uni-343", name: "Bhitarkanda", bn_name: "ভিতরকান্দা", upazila_id: "upa-40" },
//                 { id: "uni-344", name: "Hosenpur", bn_name: "হোসেনপুর", upazila_id: "upa-40" },
//                 { id: "uni-345", name: "Kazirchar", bn_name: "কাজীরচর", upazila_id: "upa-40" },
//                 { id: "uni-346", name: "Khaliya", bn_name: "খালিয়া", upazila_id: "upa-40" },
//                 { id: "uni-347", name: "Khedapara", bn_name: "খেদাপাড়া", upazila_id: "upa-40" },
//                 { id: "uni-348", name: "Kunia", bn_name: "কুনিয়া", upazila_id: "upa-40" },
//                 { id: "uni-349", name: "Machhpara", bn_name: "মাছপাড়া", upazila_id: "upa-40" },
//                 { id: "uni-350", name: "Mollakandi", bn_name: "মোল্লাকান্দি", upazila_id: "upa-40" },
//                 { id: "uni-351", name: "Panchkhola", bn_name: "পাঁচখোলা", upazila_id: "upa-40" },
//                 { id: "uni-352", name: "Rajoir", bn_name: "রাজৈর", upazila_id: "upa-40" }
//               ]
//             },
//             {
//               id: "upa-41",
//               name: "Shibchar",
//               bn_name: "শিবচর",
//               district_id: "dis-6",
//               unions: [
//                 { id: "uni-353", name: "Bandarkhola", bn_name: "বন্দরখোলা", upazila_id: "upa-41" },
//                 { id: "uni-354", name: "Banshkandi", bn_name: "বাঁশকান্দি", upazila_id: "upa-41" },
//                 { id: "uni-355", name: "Bhitarkanda", bn_name: "ভিতরকান্দা", upazila_id: "upa-41" },
//                 { id: "uni-356", name: "Dattapara", bn_name: "দত্তপাড়া", upazila_id: "upa-41" },
//                 { id: "uni-357", name: "Kadirpur", bn_name: "কাদিরপুর", upazila_id: "upa-41" },
//                 { id: "uni-358", name: "Kanthalbari", bn_name: "কাঁঠালবাড়ী", upazila_id: "upa-41" },
//                 { id: "uni-359", name: "Khedapara", bn_name: "খেদাপাড়া", upazila_id: "upa-41" },
//                 { id: "uni-360", name: "Kunia", bn_name: "কুনিয়া", upazila_id: "upa-41" },
//                 { id: "uni-361", name: "Madbarerchar", bn_name: "মাদবরেরচর", upazila_id: "upa-41" },
//                 { id: "uni-362", name: "Majchar", bn_name: "মাজচর", upazila_id: "upa-41" },
//                 { id: "uni-363", name: "Narikelbaria", bn_name: "নারিকেলবাড়িয়া", upazila_id: "upa-41" },
//                 { id: "uni-364", name: "Nawabpur", bn_name: "নবাবপুর", upazila_id: "upa-41" },
//                 { id: "uni-365", name: "Panchkhola", bn_name: "পাঁচখোলা", upazila_id: "upa-41" },
//                 { id: "uni-366", name: "Shibchar", bn_name: "শিবচর", upazila_id: "upa-41" },
//                 { id: "uni-367", name: "Sultanpur", bn_name: "সুলতানপুর", upazila_id: "upa-41" }
//               ]
//             }
//           ]
//         },

//         {
//           id: "dis-7",
//           name: "Manikganj",
//           bn_name: "মানিকগঞ্জ",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-42",
//               name: "Manikganj Sadar",
//               bn_name: "মানিকগঞ্জ সদর",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-368", name: "Atigram", bn_name: "আটিগ্রাম", upazila_id: "upa-42" },
//                 { id: "uni-369", name: "Betila", bn_name: "বেতিলা", upazila_id: "upa-42" },
//                 { id: "uni-370", name: "Bhararia", bn_name: "ভারারিয়া", upazila_id: "upa-42" },
//                 { id: "uni-371", name: "Dighi", bn_name: "দিঘী", upazila_id: "upa-42" },
//                 { id: "uni-372", name: "Garpara", bn_name: "গড়পাড়া", upazila_id: "upa-42" },
//                 { id: "uni-373", name: "Hatiya", bn_name: "হাটিয়া", upazila_id: "upa-42" },
//                 { id: "uni-374", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-42" },
//                 { id: "uni-375", name: "Khalshi", bn_name: "খলশী", upazila_id: "upa-42" },
//                 { id: "uni-376", name: "Krishnapur", bn_name: "কৃষ্ণপুর", upazila_id: "upa-42" },
//                 { id: "uni-377", name: "Manikganj", bn_name: "মানিকগঞ্জ", upazila_id: "upa-42" },
//                 { id: "uni-378", name: "Nabagram", bn_name: "নবগ্রাম", upazila_id: "upa-42" },
//                 { id: "uni-379", name: "Putail", bn_name: "পুটাইল", upazila_id: "upa-42" }
//               ]
//             },
//             {
//               id: "upa-43",
//               name: "Singair",
//               bn_name: "সিংগাইর",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-380", name: "Bailail", bn_name: "বাইলাইল", upazila_id: "upa-43" },
//                 { id: "uni-381", name: "Baira", bn_name: "বায়রা", upazila_id: "upa-43" },
//                 { id: "uni-382", name: "Bashail", bn_name: "বাসাইল", upazila_id: "upa-43" },
//                 { id: "uni-383", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-43" },
//                 { id: "uni-384", name: "Charigram", bn_name: "চারিগ্রাম", upazila_id: "upa-43" },
//                 { id: "uni-385", name: "Dashokia", bn_name: "দশকিয়া", upazila_id: "upa-43" },
//                 { id: "uni-386", name: "Doulatpur", bn_name: "দৌলতপুর", upazila_id: "upa-43" },
//                 { id: "uni-387", name: "Joymontop", bn_name: "জয়মন্টপ", upazila_id: "upa-43" },
//                 { id: "uni-388", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-43" },
//                 { id: "uni-389", name: "Lauhajang", bn_name: "লৌহজং", upazila_id: "upa-43" },
//                 { id: "uni-390", name: "Shayesta", bn_name: "শায়েস্তা", upazila_id: "upa-43" },
//                 { id: "uni-391", name: "Singair", bn_name: "সিংগাইর", upazila_id: "upa-43" },
//                 { id: "uni-392", name: "Talebpur", bn_name: "তালেবপুর", upazila_id: "upa-43" }
//               ]
//             },
//             {
//               id: "upa-44",
//               name: "Shibalaya",
//               bn_name: "শিবালয়",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-393", name: "Arpara", bn_name: "আড়পাড়া", upazila_id: "upa-44" },
//                 { id: "uni-394", name: "Balla", bn_name: "বাল্লা", upazila_id: "upa-44" },
//                 { id: "uni-395", name: "Bihar", bn_name: "বিহার", upazila_id: "upa-44" },
//                 { id: "uni-396", name: "Birkedar", bn_name: "বিরকেদার", upazila_id: "upa-44" },
//                 { id: "uni-397", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-44" },
//                 { id: "uni-398", name: "Gatti", bn_name: "গট্টি", upazila_id: "upa-44" },
//                 { id: "uni-399", name: "Kola", bn_name: "কোলা", upazila_id: "upa-44" },
//                 { id: "uni-400", name: "Mastofapur", bn_name: "মস্তফাপুর", upazila_id: "upa-44" },
//                 { id: "uni-401", name: "Muljan", bn_name: "মুলজান", upazila_id: "upa-44" },
//                 { id: "uni-402", name: "Shibalaya", bn_name: "শিবালয়", upazila_id: "upa-44" },
//                 { id: "uni-403", name: "Uthali", bn_name: "উথলী", upazila_id: "upa-44" }
//               ]
//             },
//             {
//               id: "upa-45",
//               name: "Saturia",
//               bn_name: "সাটুরিয়া",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-404", name: "Baghutia", bn_name: "বাঘুটিয়া", upazila_id: "upa-45" },
//                 { id: "uni-405", name: "Baira", bn_name: "বায়রা", upazila_id: "upa-45" },
//                 { id: "uni-406", name: "Bashail", bn_name: "বাসাইল", upazila_id: "upa-45" },
//                 { id: "uni-407", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-45" },
//                 { id: "uni-408", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-45" },
//                 { id: "uni-409", name: "Horirampur", bn_name: "হরিরামপুর", upazila_id: "upa-45" },
//                 { id: "uni-410", name: "Jahangirpur", bn_name: "জাহাঙ্গীরপুর", upazila_id: "upa-45" },
//                 { id: "uni-411", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-45" },
//                 { id: "uni-412", name: "Kola", bn_name: "কোলা", upazila_id: "upa-45" },
//                 { id: "uni-413", name: "Nalee", bn_name: "নালী", upazila_id: "upa-45" },
//                 { id: "uni-414", name: "Saturia", bn_name: "সাটুরিয়া", upazila_id: "upa-45" },
//                 { id: "uni-415", name: "Talebpur", bn_name: "তালেবপুর", upazila_id: "upa-45" }
//               ]
//             },
//             {
//               id: "upa-46",
//               name: "Harirampur",
//               bn_name: "হরিরামপুর",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-416", name: "Azimnagar", bn_name: "আজিমনগর", upazila_id: "upa-46" },
//                 { id: "uni-417", name: "Baliakhora", bn_name: "বালিয়াখোরা", upazila_id: "upa-46" },
//                 { id: "uni-418", name: "Bhararia", bn_name: "ভারারিয়া", upazila_id: "upa-46" },
//                 { id: "uni-419", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-46" },
//                 { id: "uni-420", name: "Birkedar", bn_name: "বিরকেদার", upazila_id: "upa-46" },
//                 { id: "uni-421", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-46" },
//                 { id: "uni-422", name: "Harirampur", bn_name: "হরিরামপুর", upazila_id: "upa-46" },
//                 { id: "uni-423", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-46" },
//                 { id: "uni-424", name: "Kola", bn_name: "কোলা", upazila_id: "upa-46" },
//                 { id: "uni-425", name: "Lohajang", bn_name: "লৌহজং", upazila_id: "upa-46" },
//                 { id: "uni-426", name: "Saturia", bn_name: "সাটুরিয়া", upazila_id: "upa-46" }
//               ]
//             },
//             {
//               id: "upa-47",
//               name: "Ghior",
//               bn_name: "ঘিওর",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-427", name: "Baliakhora", bn_name: "বালিয়াখোরা", upazila_id: "upa-47" },
//                 { id: "uni-428", name: "Baria", bn_name: "বাড়ীয়া", upazila_id: "upa-47" },
//                 { id: "uni-429", name: "Basan", bn_name: "বাসন", upazila_id: "upa-47" },
//                 { id: "uni-430", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-47" },
//                 { id: "uni-431", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-47" },
//                 { id: "uni-432", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-47" },
//                 { id: "uni-433", name: "Ghior", bn_name: "ঘিওর", upazila_id: "upa-47" },
//                 { id: "uni-434", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-47" },
//                 { id: "uni-435", name: "Kola", bn_name: "কোলা", upazila_id: "upa-47" },
//                 { id: "uni-436", name: "Nalee", bn_name: "নালী", upazila_id: "upa-47" },
//                 { id: "uni-437", name: "Paila", bn_name: "পাইলা", upazila_id: "upa-47" }
//               ]
//             },
//             {
//               id: "upa-48",
//               name: "Daulatpur",
//               bn_name: "দৌলতপুর",
//               district_id: "dis-7",
//               unions: [
//                 { id: "uni-438", name: "Baliakhora", bn_name: "বালিয়াখোরা", upazila_id: "upa-48" },
//                 { id: "uni-439", name: "Baria", bn_name: "বাড়ীয়া", upazila_id: "upa-48" },
//                 { id: "uni-440", name: "Basan", bn_name: "বাসন", upazila_id: "upa-48" },
//                 { id: "uni-441", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-48" },
//                 { id: "uni-442", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-48" },
//                 { id: "uni-443", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-48" },
//                 { id: "uni-444", name: "Daulatpur", bn_name: "দৌলতপুর", upazila_id: "upa-48" },
//                 { id: "uni-445", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-48" },
//                 { id: "uni-446", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-48" },
//                 { id: "uni-447", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-48" },
//                 { id: "uni-448", name: "Kola", bn_name: "কোলা", upazila_id: "upa-48" }
//               ]
//             }
//           ]
//         },

//         {
//           id: "dis-8",
//           name: "Munshiganj",
//           bn_name: "মুন্সিগঞ্জ",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-49",
//               name: "Munshiganj Sadar",
//               bn_name: "মুন্সিগঞ্জ সদর",
//               district_id: "dis-8",
//               unions: [
//                 { id: "uni-449", name: "Bajrajogini", bn_name: "বজ্রযোগিনী", upazila_id: "upa-49" },
//                 { id: "uni-450", name: "Baraikhali", bn_name: "বারইখালী", upazila_id: "upa-49" },
//                 { id: "uni-451", name: "Charvaga", bn_name: "চরভাগা", upazila_id: "upa-49" },
//                 { id: "uni-452", name: "Dighirpar", bn_name: "দিঘীরপাড়", upazila_id: "upa-49" },
//                 { id: "uni-453", name: "Hasail", bn_name: "হাসাইল", upazila_id: "upa-49" },
//                 { id: "uni-454", name: "Kolapara", bn_name: "কোলাপাড়া", upazila_id: "upa-49" },
//                 { id: "uni-455", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-49" },
//                 { id: "uni-456", name: "Mirkadim", bn_name: "মিরকাদিম", upazila_id: "upa-49" },
//                 { id: "uni-457", name: "Mollahpur", bn_name: "মোল্লাপুর", upazila_id: "upa-49" },
//                 { id: "uni-458", name: "Munshiganj", bn_name: "মুন্সিগঞ্জ", upazila_id: "upa-49" },
//                 { id: "uni-459", name: "Rikabibazar", bn_name: "রিকাবিবাজার", upazila_id: "upa-49" },
//                 { id: "uni-460", name: "Tengarchar", bn_name: "টেংগারচর", upazila_id: "upa-49" }
//               ]
//             },
//             {
//               id: "upa-50",
//               name: "Sreenagar",
//               bn_name: "শ্রীনগর",
//               district_id: "dis-8",
//               unions: [
//                 { id: "uni-461", name: "Bagra", bn_name: "বাগড়া", upazila_id: "upa-50" },
//                 { id: "uni-462", name: "Baraikhali", bn_name: "বারইখালী", upazila_id: "upa-50" },
//                 { id: "uni-463", name: "Basan", bn_name: "বাসন", upazila_id: "upa-50" },
//                 { id: "uni-464", name: "Birtara", bn_name: "বিরতারা", upazila_id: "upa-50" },
//                 { id: "uni-465", name: "Dighirpar", bn_name: "দিঘীরপাড়", upazila_id: "upa-50" },
//                 { id: "uni-466", name: "Hasail", bn_name: "হাসাইল", upazila_id: "upa-50" },
//                 { id: "uni-467", name: "Kolapara", bn_name: "কোলাপাড়া", upazila_id: "upa-50" },
//                 { id: "uni-468", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-50" },
//                 { id: "uni-469", name: "Maijchar", bn_name: "মাইজচর", upazila_id: "upa-50" },
//                 { id: "uni-470", name: "Rajanagar", bn_name: "রাজানগর", upazila_id: "upa-50" },
//                 { id: "uni-471", name: "Sholaghar", bn_name: "শোলাঘর", upazila_id: "upa-50" },
//                 { id: "uni-472", name: "Sreenagar", bn_name: "শ্রীনগর", upazila_id: "upa-50" },
//                 { id: "uni-473", name: "Vaggakol", bn_name: "ভাগ্যকুল", upazila_id: "upa-50" }
//               ]
//             },
//             {
//               id: "upa-51",
//               name: "Sirajdikhan",
//               bn_name: "সিরাজদিখান",
//               district_id: "dis-8",
//               unions: [
//                 { id: "uni-474", name: "Atpara", bn_name: "আটপাড়া", upazila_id: "upa-51" },
//                 { id: "uni-475", name: "Baghra", bn_name: "বাঘড়া", upazila_id: "upa-51" },
//                 { id: "uni-476", name: "Baraikhali", bn_name: "বারইখালী", upazila_id: "upa-51" },
//                 { id: "uni-477", name: "Barikandra", bn_name: "বারিকান্দ্রা", upazila_id: "upa-51" },
//                 { id: "uni-478", name: "Basail", bn_name: "বাসাইল", upazila_id: "upa-51" },
//                 { id: "uni-479", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-51" },
//                 { id: "uni-480", name: "Charsindur", bn_name: "চরসিন্দুর", upazila_id: "upa-51" },
//                 { id: "uni-481", name: "Dighirpar", bn_name: "দিঘীরপাড়", upazila_id: "upa-51" },
//                 { id: "uni-482", name: "Kola", bn_name: "কোলা", upazila_id: "upa-51" },
//                 { id: "uni-483", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-51" },
//                 { id: "uni-484", name: "Kusumpur", bn_name: "কুসুমপুর", upazila_id: "upa-51" },
//                 { id: "uni-485", name: "Maijchar", bn_name: "মাইজচর", upazila_id: "upa-51" },
//                 { id: "uni-486", name: "Sirajdikhan", bn_name: "সিরাজদিখান", upazila_id: "upa-51" }
//               ]
//             },
//             {
//               id: "upa-52",
//               name: "Louhajanj",
//               bn_name: "লৌহজং",
//               district_id: "dis-8",
//               unions: [
//                 { id: "uni-487", name: "Baliakhora", bn_name: "বালিয়াখোরা", upazila_id: "upa-52" },
//                 { id: "uni-488", name: "Baria", bn_name: "বাড়ীয়া", upazila_id: "upa-52" },
//                 { id: "uni-489", name: "Basan", bn_name: "বাসন", upazila_id: "upa-52" },
//                 { id: "uni-490", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-52" },
//                 { id: "uni-491", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-52" },
//                 { id: "uni-492", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-52" },
//                 { id: "uni-493", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-52" },
//                 { id: "uni-494", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-52" },
//                 { id: "uni-495", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-52" },
//                 { id: "uni-496", name: "Kola", bn_name: "কোলা", upazila_id: "upa-52" },
//                 { id: "uni-497", name: "Louhajanj", bn_name: "লৌহজং", upazila_id: "upa-52" },
//                 { id: "uni-498", name: "Nalee", bn_name: "নালী", upazila_id: "upa-52" }
//               ]
//             },
//             {
//               id: "upa-53",
//               name: "Gajaria",
//               bn_name: "গজারিয়া",
//               district_id: "dis-8",
//               unions: [
//                 { id: "uni-499", name: "Baliakhora", bn_name: "বালিয়াখোরা", upazila_id: "upa-53" },
//                 { id: "uni-500", name: "Baria", bn_name: "বাড়ীয়া", upazila_id: "upa-53" },
//                 { id: "uni-501", name: "Basan", bn_name: "বাসন", upazila_id: "upa-53" },
//                 { id: "uni-502", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-53" },
//                 { id: "uni-503", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-53" },
//                 { id: "uni-504", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-53" },
//                 { id: "uni-505", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-53" },
//                 { id: "uni-506", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-53" },
//                 { id: "uni-507", name: "Gajaria", bn_name: "গজারিয়া", upazila_id: "upa-53" },
//                 { id: "uni-508", name: "Kachari", bn_name: "কাচারী", upazila_id: "upa-53" },
//                 { id: "uni-509", name: "Kola", bn_name: "কোলা", upazila_id: "upa-53" },
//                 { id: "uni-510", name: "Nalee", bn_name: "নালী", upazila_id: "upa-53" }
//               ]
//             },
//             {
//               id: "upa-54",
//               name: "Tongibari",
//               bn_name: "টঙ্গীবাড়ী",
//               district_id: "dis-8",
//               unions: [
//                 { id: "uni-511", name: "Abdullapur", bn_name: "আব্দুল্লাপুর", upazila_id: "upa-54" },
//                 { id: "uni-512", name: "Arial", bn_name: "আরিয়াল", upazila_id: "upa-54" },
//                 { id: "uni-513", name: "Autshahi", bn_name: "আউটশাহী", upazila_id: "upa-54" },
//                 { id: "uni-514", name: "Bajitpur", bn_name: "বাজিতপুর", upazila_id: "upa-54" },
//                 { id: "uni-515", name: "Bilaspur", bn_name: "বিলাসপুর", upazila_id: "upa-54" },
//                 { id: "uni-516", name: "Dighirpar", bn_name: "দিঘীরপাড়", upazila_id: "upa-54" },
//                 { id: "uni-517", name: "Hasail", bn_name: "হাসাইল", upazila_id: "upa-54" },
//                 { id: "uni-518", name: "Kamarkhara", bn_name: "কামারখারা", upazila_id: "upa-54" },
//                 { id: "uni-519", name: "Kathakhali", bn_name: "কাঠাখালী", upazila_id: "upa-54" },
//                 { id: "uni-520", name: "Khanepur", bn_name: "খানেপুর", upazila_id: "upa-54" },
//                 { id: "uni-521", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-54" },
//                 { id: "uni-522", name: "Rajanagar", bn_name: "রাজানগর", upazila_id: "upa-54" },
//                 { id: "uni-523", name: "Tongibari", bn_name: "টঙ্গীবাড়ী", upazila_id: "upa-54" }
//               ]
//             }
//           ]
//         },

//        {
//   id: "dis-9",
//   name: "Narayanganj",
//   bn_name: "নারায়ণগঞ্জ",
//   division_id: "div-1",
//   upazilas: [
//     {
//       id: "upa-55",
//       name: "Narayanganj Sadar",
//       bn_name: "নারায়ণগঞ্জ সদর",
//       district_id: "dis-9",
//       unions: [
//         { id: "uni-524", name: "Aliganj", bn_name: "আলীগঞ্জ", upazila_id: "upa-55" },
//         { id: "uni-525", name: "Bandar", bn_name: "বন্দর", upazila_id: "upa-55" },
//         { id: "uni-526", name: "Baktaboli", bn_name: "বক্তাবলী", upazila_id: "upa-55" },
//         { id: "uni-527", name: "Dhamgar", bn_name: "ধামগড়", upazila_id: "upa-55" },
//         { id: "uni-528", name: "Fatullah", bn_name: "ফতুল্লা", upazila_id: "upa-55" },
//         { id: "uni-529", name: "Gognagar", bn_name: "গোগনগর", upazila_id: "upa-55" },
//         { id: "uni-530", name: "Kachpur", bn_name: "কাচপুর", upazila_id: "upa-55" },
//         { id: "uni-531", name: "Kalagachhia", bn_name: "কালাগাছিয়া", upazila_id: "upa-55" },
//         { id: "uni-532", name: "Kashipur", bn_name: "কাশিপুর", upazila_id: "upa-55" },
//         { id: "uni-533", name: "Kayetpara", bn_name: "কায়েতপাড়া", upazila_id: "upa-55" },
//         { id: "uni-534", name: "Kutubpur", bn_name: "কুতুবপুর", upazila_id: "upa-55" },
//         { id: "uni-535", name: "Murapara", bn_name: "মুরাপাড়া", upazila_id: "upa-55" },
//         { id: "uni-536", name: "Narayanganj", bn_name: "নারায়ণগঞ্জ", upazila_id: "upa-55" },
//         { id: "uni-537", name: "Rupganj", bn_name: "রূপগঞ্জ", upazila_id: "upa-55" },
//         { id: "uni-538", name: "Siddirganj", bn_name: "সিদ্ধিরগঞ্জ", upazila_id: "upa-55" }
//       ]
//     },
//     {
//       id: "upa-70",
//       name: "Sonargaon",
//       bn_name: "সোনারগাঁও",
//       district_id: "dis-9",
//       unions: [
//         { id: "uni-765", name: "Baidyer Bazar", bn_name: "বৈদ্যের বাজার", upazila_id: "upa-70" },
//         { id: "uni-766", name: "Bandar", bn_name: "বন্দর", upazila_id: "upa-70" },
//         { id: "uni-767", name: "Baradi", bn_name: "বারাদী", upazila_id: "upa-70" },
//         { id: "uni-768", name: "Barijhat", bn_name: "বারীঘাট", upazila_id: "upa-70" },
//         { id: "uni-769", name: "Basail", bn_name: "বাসাইল", upazila_id: "upa-70" },
//         { id: "uni-770", name: "Chashara", bn_name: "চাষাড়া", upazila_id: "upa-70" },
//         { id: "uni-771", name: "Colonchar", bn_name: "কলনচর", upazila_id: "upa-70" },
//         { id: "uni-772", name: "Daudpur", bn_name: "দাউদপুর", upazila_id: "upa-70" },
//         { id: "uni-773", name: "Dhamaisha", bn_name: "ধামাইশা", upazila_id: "upa-70" },
//         { id: "uni-774", name: "Gognagar", bn_name: "গোগনগর", upazila_id: "upa-70" },
//         { id: "uni-775", name: "Jampur", bn_name: "জামপুর", upazila_id: "upa-70" },
//         { id: "uni-776", name: "Kachpur", bn_name: "কাচপুর", upazila_id: "upa-70" },
//         { id: "uni-777", name: "Madanpur", bn_name: "মদনপুর", upazila_id: "upa-70" },
//         { id: "uni-778", name: "Meghna", bn_name: "মেঘনা", upazila_id: "upa-70" },
//         { id: "uni-779", name: "Noagaon", bn_name: "নোয়াগাঁও", upazila_id: "upa-70" },
//         { id: "uni-780", name: "Pirijpur", bn_name: "পিরিজপুর", upazila_id: "upa-70" },
//         { id: "uni-781", name: "Sadipur", bn_name: "সাদীপুর", upazila_id: "upa-70" },
//         { id: "uni-782", name: "Sonargaon", bn_name: "সোনারগাঁও", upazila_id: "upa-70" }
//       ]
//     },
//     {
//       id: "upa-71",
//       name: "Bandar",
//       bn_name: "বন্দর",
//       district_id: "dis-9",
//       unions: [
//         { id: "uni-783", name: "Bandar", bn_name: "বন্দর", upazila_id: "upa-71" },
//         { id: "uni-784", name: "Dhamgar", bn_name: "ধামগড়", upazila_id: "upa-71" },
//         { id: "uni-785", name: "Kalagachhia", bn_name: "কালাগাছিয়া", upazila_id: "upa-71" },
//         { id: "uni-786", name: "Kutubpur", bn_name: "কুতুবপুর", upazila_id: "upa-71" },
//         { id: "uni-787", name: "Murapara", bn_name: "মুরাপাড়া", upazila_id: "upa-71" },
//         { id: "uni-788", name: "Musapur", bn_name: "মুছাপুর", upazila_id: "upa-71" },
//         { id: "uni-789", name: "Rupganj", bn_name: "রূপগঞ্জ", upazila_id: "upa-71" },
//         { id: "uni-790", name: "Siddirganj", bn_name: "সিদ্ধিরগঞ্জ", upazila_id: "upa-71" }
//       ]
//     },
//     {
//       id: "upa-72",
//       name: "Araihazar",
//       bn_name: "আড়াইহাজার",
//       district_id: "dis-9",
//       unions: [
//         { id: "uni-791", name: "Araihazar", bn_name: "আড়াইহাজার", upazila_id: "upa-72" },
//         { id: "uni-792", name: "Bishnandi", bn_name: "বিশনন্দী", upazila_id: "upa-72" },
//         { id: "uni-793", name: "Brahmandi", bn_name: "ব্রাহ্মনন্দী", upazila_id: "upa-72" },
//         { id: "uni-794", name: "Duptara", bn_name: "দুপ্তারা", upazila_id: "upa-72" },
//         { id: "uni-795", name: "Gopaldi", bn_name: "গোপালদী", upazila_id: "upa-72" },
//         { id: "uni-796", name: "Kalakopa", bn_name: "কালাকোপা", upazila_id: "upa-72" },
//         { id: "uni-797", name: "Khagakanda", bn_name: "খাগাকান্দা", upazila_id: "upa-72" },
//         { id: "uni-798", name: "Mahmudpur", bn_name: "মাহমুদপুর", upazila_id: "upa-72" },
//         { id: "uni-799", name: "Muladi", bn_name: "মুলাদী", upazila_id: "upa-72" },
//         { id: "uni-800", name: "Narandi", bn_name: "নারান্দী", upazila_id: "upa-72" },
//         { id: "uni-801", name: "Sadasardi", bn_name: "সদাসরদী", upazila_id: "upa-72" },
//         { id: "uni-802", name: "Satgram", bn_name: "সাতগ্রাম", upazila_id: "upa-72" },
//         { id: "uni-803", name: "Uchitpur", bn_name: "উচিতপুর", upazila_id: "upa-72" }
//       ]
//     },
//     {
//       id: "upa-73",
//       name: "Rupganj",
//       bn_name: "রূপগঞ্জ",
//       district_id: "dis-9",
//       unions: [
//         { id: "uni-804", name: "Bholaba", bn_name: "ভোলাব", upazila_id: "upa-73" },
//         { id: "uni-805", name: "Bulta", bn_name: "বুলতা", upazila_id: "upa-73" },
//         { id: "uni-806", name: "Daudpur", bn_name: "দাউদপুর", upazila_id: "upa-73" },
//         { id: "uni-807", name: "Golakandail", bn_name: "গোলাকান্দাইল", upazila_id: "upa-73" },
//         { id: "uni-808", name: "Kanchan", bn_name: "কাঞ্চন", upazila_id: "upa-73" },
//         { id: "uni-809", name: "Kayetpara", bn_name: "কায়েতপাড়া", upazila_id: "upa-73" },
//         { id: "uni-810", name: "Murapara", bn_name: "মুরাপাড়া", upazila_id: "upa-73" },
//         { id: "uni-811", name: "Rupganj", bn_name: "রূপগঞ্জ", upazila_id: "upa-73" },
//         { id: "uni-812", name: "Tarabo", bn_name: "তারাব", upazila_id: "upa-73" }
//       ]
//     },
//     {
//       id: "upa-74",
//       name: "Siddirganj",
//       bn_name: "সিদ্ধিরগঞ্জ",
//       district_id: "dis-9",
//       unions: [
//         { id: "uni-813", name: "Atabaha", bn_name: "আটাবহ", upazila_id: "upa-74" },
//         { id: "uni-814", name: "Baidyer Bazar", bn_name: "বৈদ্যের বাজার", upazila_id: "upa-74" },
//         { id: "uni-815", name: "Bandar", bn_name: "বন্দর", upazila_id: "upa-74" },
//         { id: "uni-816", name: "Barijhat", bn_name: "বারীঘাট", upazila_id: "upa-74" },
//         { id: "uni-817", name: "Dhamgar", bn_name: "ধামগড়", upazila_id: "upa-74" },
//         { id: "uni-818", name: "Kalagachhia", bn_name: "কালাগাছিয়া", upazila_id: "upa-74" },
//         { id: "uni-819", name: "Kutubpur", bn_name: "কুতুবপুর", upazila_id: "upa-74" },
//         { id: "uni-820", name: "Madanpur", bn_name: "মদনপুর", upazila_id: "upa-74" },
//         { id: "uni-821", name: "Musapur", bn_name: "মুছাপুর", upazila_id: "upa-74" },
//         { id: "uni-822", name: "Noagaon", bn_name: "নোয়াগাঁও", upazila_id: "upa-74" },
//         { id: "uni-823", name: "Siddirganj", bn_name: "সিদ্ধিরগঞ্জ", upazila_id: "upa-74" }
//       ]
//     }
//   ]
// },

//       {
//   id: "dis-10",
//   name: "Narsingdi",
//   bn_name: "নরসিংদী",
//   division_id: "div-1",
//   upazilas: [
//     {
//       id: "upa-56",
//       name: "Narsingdi Sadar",
//       bn_name: "নরসিংদী সদর",
//       district_id: "dis-10",
//       unions: [
//         { id: "uni-539", name: "Alokbali", bn_name: "আলোকবালী", upazila_id: "upa-56" },
//         { id: "uni-540", name: "Amdia", bn_name: "আমদিয়া", upazila_id: "upa-56" },
//         { id: "uni-541", name: "Char Dighaldi", bn_name: "চর দিঘলদী", upazila_id: "upa-56" },
//         { id: "uni-542", name: "Chinishpur", bn_name: "চিনিশপুর", upazila_id: "upa-56" },
//         { id: "uni-543", name: "Hajipur", bn_name: "হাজীপুর", upazila_id: "upa-56" },
//         { id: "uni-544", name: "Karimpur", bn_name: "করিমপুর", upazila_id: "upa-56" },
//         { id: "uni-545", name: "Khathalia", bn_name: "খাথালিয়া", upazila_id: "upa-56" },
//         { id: "uni-546", name: "Mahishasura", bn_name: "মহিষাশুড়া", upazila_id: "upa-56" },
//         { id: "uni-547", name: "Meherpara", bn_name: "মেহেরপাড়া", upazila_id: "upa-56" },
//         { id: "uni-548", name: "Narsingdi", bn_name: "নরসিংদী", upazila_id: "upa-56" },
//         { id: "uni-549", name: "Nazarpur", bn_name: "নজরপুর", upazila_id: "upa-56" },
//         { id: "uni-550", name: "Nuralla", bn_name: "নুরাল্লা", upazila_id: "upa-56" },
//         { id: "uni-551", name: "Panchdona", bn_name: "পাঁচদোনা", upazila_id: "upa-56" },
//         { id: "uni-552", name: "Silmandi", bn_name: "শিলমান্দী", upazila_id: "upa-56" }
//       ]
//     },
//     {
//       id: "upa-75",
//       name: "Belabo",
//       bn_name: "বেলাবো",
//       district_id: "dis-10",
//       unions: [
//         { id: "uni-824", name: "Amlaba", bn_name: "আমলাব", upazila_id: "upa-75" },
//         { id: "uni-825", name: "Bajnaba", bn_name: "বাজনাব", upazila_id: "upa-75" },
//         { id: "uni-826", name: "Belabo", bn_name: "বেলাবো", upazila_id: "upa-75" },
//         { id: "uni-827", name: "Binyaba", bn_name: "বিন্যাব", upazila_id: "upa-75" },
//         { id: "uni-828", name: "Chala", bn_name: "চালা", upazila_id: "upa-75" },
//         { id: "uni-829", name: "Danga", bn_name: "ডাঙ্গা", upazila_id: "upa-75" },
//         { id: "uni-830", name: "Dawlatpur", bn_name: "দৌলতপুর", upazila_id: "upa-75" },
//         { id: "uni-831", name: "Ghorashal", bn_name: "ঘোড়াশাল", upazila_id: "upa-75" },
//         { id: "uni-832", name: "Gobindapur", bn_name: "গোবিন্দপুর", upazila_id: "upa-75" },
//         { id: "uni-833", name: "Kachikata", bn_name: "কাচিকাটা", upazila_id: "upa-75" },
//         { id: "uni-834", name: "Moktarpur", bn_name: "মোক্তারপুর", upazila_id: "upa-75" },
//         { id: "uni-835", name: "Patuli", bn_name: "পাটুলী", upazila_id: "upa-75" },
//         { id: "uni-836", name: "Sallabad", bn_name: "সল্লাবাদ", upazila_id: "upa-75" },
//         { id: "uni-837", name: "Shambhupura", bn_name: "শম্ভুপুর", upazila_id: "upa-75" }
//       ]
//     },
//     {
//       id: "upa-76",
//       name: "Monohardi",
//       bn_name: "মনোহরদী",
//       district_id: "dis-10",
//       unions: [
//         { id: "uni-838", name: "Baghadi", bn_name: "বাঘাদি", upazila_id: "upa-76" },
//         { id: "uni-839", name: "Baktarpur", bn_name: "বক্তারপুর", upazila_id: "upa-76" },
//         { id: "uni-840", name: "Banshgari", bn_name: "বাঁশগাড়ী", upazila_id: "upa-76" },
//         { id: "uni-841", name: "Chakradha", bn_name: "চক্রধা", upazila_id: "upa-76" },
//         { id: "uni-842", name: "Char Sindur", bn_name: "চর সিন্দুর", upazila_id: "upa-76" },
//         { id: "uni-843", name: "Ghorashal", bn_name: "ঘোড়াশাল", upazila_id: "upa-76" },
//         { id: "uni-844", name: "Hatirdia", bn_name: "হাটিরদিয়া", upazila_id: "upa-76" },
//         { id: "uni-845", name: "Khidirpur", bn_name: "খিদিরপুর", upazila_id: "upa-76" },
//         { id: "uni-846", name: "Monohardi", bn_name: "মনোহরদী", upazila_id: "upa-76" },
//         { id: "uni-847", name: "Rupganj", bn_name: "রূপগঞ্জ", upazila_id: "upa-76" },
//         { id: "uni-848", name: "Sreenagar", bn_name: "শ্রীনগর", upazila_id: "upa-76" },
//         { id: "uni-849", name: "Sutrapur", bn_name: "সুত্রাপুর", upazila_id: "upa-76" }
//       ]
//     },
//     {
//       id: "upa-77",
//       name: "Palash",
//       bn_name: "পলাশ",
//       district_id: "dis-10",
//       unions: [
//         { id: "uni-850", name: "Alirtek", bn_name: "আলীরটেক", upazila_id: "upa-77" },
//         { id: "uni-851", name: "Char Aralia", bn_name: "চর আরালিয়া", upazila_id: "upa-77" },
//         { id: "uni-852", name: "Char Madhabdia", bn_name: "চর মাধবদিয়া", upazila_id: "upa-77" },
//         { id: "uni-853", name: "Danga", bn_name: "ডাঙ্গা", upazila_id: "upa-77" },
//         { id: "uni-854", name: "Ghorashal", bn_name: "ঘোড়াশাল", upazila_id: "upa-77" },
//         { id: "uni-855", name: "Gobindapur", bn_name: "গোবিন্দপুর", upazila_id: "upa-77" },
//         { id: "uni-856", name: "Gopinathpur", bn_name: "গোপীনাথপুর", upazila_id: "upa-77" },
//         { id: "uni-857", name: "Jinardi", bn_name: "জিনারদী", upazila_id: "upa-77" },
//         { id: "uni-858", name: "Madhabdi", bn_name: "মাধবদী", upazila_id: "upa-77" },
//         { id: "uni-859", name: "Mogral", bn_name: "মোগরাল", upazila_id: "upa-77" },
//         { id: "uni-860", name: "Muladi", bn_name: "মুলাদী", upazila_id: "upa-77" },
//         { id: "uni-861", name: "Palash", bn_name: "পলাশ", upazila_id: "upa-77" },
//         { id: "uni-862", name: "Parthashi", bn_name: "পার্থশী", upazila_id: "upa-77" },
//         { id: "uni-863", name: "Rupganj", bn_name: "রূপগঞ্জ", upazila_id: "upa-77" }
//       ]
//     },
//     {
//       id: "upa-78",
//       name: "Raipura",
//       bn_name: "রায়পুরা",
//       district_id: "dis-10",
//       unions: [
//         { id: "uni-864", name: "Banshgari", bn_name: "বাঁশগাড়ী", upazila_id: "upa-78" },
//         { id: "uni-865", name: "Bhabanipur", bn_name: "ভবানীপুর", upazila_id: "upa-78" },
//         { id: "uni-866", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-78" },
//         { id: "uni-867", name: "Char Aralia", bn_name: "চর আরালিয়া", upazila_id: "upa-78" },
//         { id: "uni-868", name: "Char Madhabdia", bn_name: "চর মাধবদিয়া", upazila_id: "upa-78" },
//         { id: "uni-869", name: "Danga", bn_name: "ডাঙ্গা", upazila_id: "upa-78" },
//         { id: "uni-870", name: "Dawlatpur", bn_name: "দৌলতপুর", upazila_id: "upa-78" },
//         { id: "uni-871", name: "Ghorashal", bn_name: "ঘোড়াশাল", upazila_id: "upa-78" },
//         { id: "uni-872", name: "Gobindapur", bn_name: "গোবিন্দপুর", upazila_id: "upa-78" },
//         { id: "uni-873", name: "Kachikata", bn_name: "কাচিকাটা", upazila_id: "upa-78" },
//         { id: "uni-874", name: "Madhabdi", bn_name: "মাধবদী", upazila_id: "upa-78" },
//         { id: "uni-875", name: "Raipura", bn_name: "রায়পুরা", upazila_id: "upa-78" },
//         { id: "uni-876", name: "Rasulpur", bn_name: "রসুলপুর", upazila_id: "upa-78" },
//         { id: "uni-877", name: "Sreenagar", bn_name: "শ্রীনগর", upazila_id: "upa-78" }
//       ]
//     },
//     {
//       id: "upa-79",
//       name: "Shibpur",
//       bn_name: "শিবপুর",
//       district_id: "dis-10",
//       unions: [
//         { id: "uni-878", name: "Amlaba", bn_name: "আমলাব", upazila_id: "upa-79" },
//         { id: "uni-879", name: "Aminpur", bn_name: "আমিনপুর", upazila_id: "upa-79" },
//         { id: "uni-880", name: "Bajitpur", bn_name: "বাজিতপুর", upazila_id: "upa-79" },
//         { id: "uni-881", name: "Bhabanipur", bn_name: "ভবানীপুর", upazila_id: "upa-79" },
//         { id: "uni-882", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-79" },
//         { id: "uni-883", name: "Char Aralia", bn_name: "চর আরালিয়া", upazila_id: "upa-79" },
//         { id: "uni-884", name: "Char Madhabdia", bn_name: "চর মাধবদিয়া", upazila_id: "upa-79" },
//         { id: "uni-885", name: "Danga", bn_name: "ডাঙ্গা", upazila_id: "upa-79" },
//         { id: "uni-886", name: "Ghorashal", bn_name: "ঘোড়াশাল", upazila_id: "upa-79" },
//         { id: "uni-887", name: "Gobindapur", bn_name: "গোবিন্দপুর", upazila_id: "upa-79" },
//         { id: "uni-888", name: "Kachikata", bn_name: "কাচিকাটা", upazila_id: "upa-79" },
//         { id: "uni-889", name: "Madhabdi", bn_name: "মাধবদী", upazila_id: "upa-79" },
//         { id: "uni-890", name: "Muladi", bn_name: "মুলাদী", upazila_id: "upa-79" },
//         { id: "uni-891", name: "Shibpur", bn_name: "শিবপুর", upazila_id: "upa-79" },
//         { id: "uni-892", name: "Sutrapur", bn_name: "সুত্রাপুর", upazila_id: "upa-79" }
//       ]
//     }
//   ]
// },

//       {
//   id: "dis-11",
//   name: "Rajbari",
//   bn_name: "রাজবাড়ী",
//   division_id: "div-1",
//   upazilas: [
//     {
//       id: "upa-57",
//       name: "Rajbari Sadar",
//       bn_name: "রাজবাড়ী সদর",
//       district_id: "dis-11",
//       unions: [
//         { id: "uni-553", name: "Alipur", bn_name: "আলীপুর", upazila_id: "upa-57" },
//         { id: "uni-554", name: "Banibaha", bn_name: "বানীবাহ", upazila_id: "upa-57" },
//         { id: "uni-555", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-57" },
//         { id: "uni-556", name: "Daulatdia", bn_name: "দৌলতদিয়া", upazila_id: "upa-57" },
//         { id: "uni-557", name: "Debagram", bn_name: "দেবগ্রাম", upazila_id: "upa-57" },
//         { id: "uni-558", name: "Khankhanapur", bn_name: "খানখানাপুর", upazila_id: "upa-57" },
//         { id: "uni-559", name: "Mrigi", bn_name: "মৃগী", upazila_id: "upa-57" },
//         { id: "uni-560", name: "Mulghar", bn_name: "মুলঘর", upazila_id: "upa-57" },
//         { id: "uni-561", name: "Patta", bn_name: "পাট্টা", upazila_id: "upa-57" },
//         { id: "uni-562", name: "Rajbari", bn_name: "রাজবাড়ী", upazila_id: "upa-57" },
//         { id: "uni-563", name: "Ramkantapur", bn_name: "রামকান্তপুর", upazila_id: "upa-57" },
//         { id: "uni-564", name: "Shahidwahabpur", bn_name: "শহীদওয়াহাবপুর", upazila_id: "upa-57" }
//       ]
//     },
//     {
//       id: "upa-80",
//       name: "Baliakandi",
//       bn_name: "বালিয়াকান্দি",
//       district_id: "dis-11",
//       unions: [
//         { id: "uni-893", name: "Baliakandi", bn_name: "বালিয়াকান্দি", upazila_id: "upa-80" },
//         { id: "uni-894", name: "Baliakandi Paschim", bn_name: "বালিয়াকান্দি পশ্চিম", upazila_id: "upa-80" },
//         { id: "uni-895", name: "Baliakandi Purba", bn_name: "বালিয়াকান্দি পূর্ব", upazila_id: "upa-80" },
//         { id: "uni-896", name: "Chandoni", bn_name: "চন্দনী", upazila_id: "upa-80" },
//         { id: "uni-897", name: "Dhaneshwargati", bn_name: "ধনেশ্বরগাতী", upazila_id: "upa-80" },
//         { id: "uni-898", name: "Islampur", bn_name: "ইসলামপুর", upazila_id: "upa-80" },
//         { id: "uni-899", name: "Jamalpur", bn_name: "জামালপুর", upazila_id: "upa-80" },
//         { id: "uni-900", name: "Jangal", bn_name: "জঙ্গল", upazila_id: "upa-80" },
//         { id: "uni-901", name: "Mollakandi", bn_name: "মোল্লাকান্দি", upazila_id: "upa-80" },
//         { id: "uni-902", name: "Nachol", bn_name: "নাচোল", upazila_id: "upa-80" },
//         { id: "uni-903", name: "Narua", bn_name: "নারুয়া", upazila_id: "upa-80" },
//         { id: "uni-904", name: "Peyarpur", bn_name: "পেয়ারপুর", upazila_id: "upa-80" },
//         { id: "uni-905", name: "Radhanagar", bn_name: "রাধানগর", upazila_id: "upa-80" },
//         { id: "uni-906", name: "Rajanagar", bn_name: "রাজানগর", upazila_id: "upa-80" }
//       ]
//     },
//     {
//       id: "upa-81",
//       name: "Goalandaghat",
//       bn_name: "গোয়ালন্দ ঘাট",
//       district_id: "dis-11",
//       unions: [
//         { id: "uni-907", name: "Bara Krishnapur", bn_name: "বড় কৃষ্ণপুর", upazila_id: "upa-81" },
//         { id: "uni-908", name: "Barat", bn_name: "বারট", upazila_id: "upa-81" },
//         { id: "uni-909", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-81" },
//         { id: "uni-910", name: "Dariabad", bn_name: "দরিয়াবাদ", upazila_id: "upa-81" },
//         { id: "uni-911", name: "Goalandaghat", bn_name: "গোয়ালন্দ ঘাট", upazila_id: "upa-81" },
//         { id: "uni-912", name: "Krishnanagar", bn_name: "কৃষ্ণনগর", upazila_id: "upa-81" },
//         { id: "uni-913", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-81" },
//         { id: "uni-914", name: "Mahishasura", bn_name: "মহিষাশুড়া", upazila_id: "upa-81" },
//         { id: "uni-915", name: "Maijpara", bn_name: "মাইজপাড়া", upazila_id: "upa-81" },
//         { id: "uni-916", name: "Nawabpur", bn_name: "নবাবপুর", upazila_id: "upa-81" },
//         { id: "uni-917", name: "Peyarpur", bn_name: "পেয়ারপুর", upazila_id: "upa-81" },
//         { id: "uni-918", name: "Radhanagar", bn_name: "রাধানগর", upazila_id: "upa-81" },
//         { id: "uni-919", name: "Rajanagar", bn_name: "রাজানগর", upazila_id: "upa-81" },
//         { id: "uni-920", name: "Umedpur", bn_name: "উমেদপুর", upazila_id: "upa-81" }
//       ]
//     },
//     {
//       id: "upa-82",
//       name: "Pangsha",
//       bn_name: "পাংশা",
//       district_id: "dis-11",
//       unions: [
//         { id: "uni-921", name: "Babupara", bn_name: "বাবুপাড়া", upazila_id: "upa-82" },
//         { id: "uni-922", name: "Baghutia", bn_name: "বাঘুটিয়া", upazila_id: "upa-82" },
//         { id: "uni-923", name: "Balidia", bn_name: "বালিদিয়া", upazila_id: "upa-82" },
//         { id: "uni-924", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-82" },
//         { id: "uni-925", name: "Bhabanipur", bn_name: "ভবানীপুর", upazila_id: "upa-82" },
//         { id: "uni-926", name: "Chandoni", bn_name: "চন্দনী", upazila_id: "upa-82" },
//         { id: "uni-927", name: "Charatra", bn_name: "চরআত্রা", upazila_id: "upa-82" },
//         { id: "uni-928", name: "Dariapur", bn_name: "দরিয়াপুর", upazila_id: "upa-82" },
//         { id: "uni-929", name: "Haridasdi-Mahendradi", bn_name: "হরিদাসদী-মহেন্দ্রদী", upazila_id: "upa-82" },
//         { id: "uni-930", name: "Jashai", bn_name: "যশাই", upazila_id: "upa-82" },
//         { id: "uni-931", name: "Kadam Rasul", bn_name: "কদম রসুল", upazila_id: "upa-82" },
//         { id: "uni-932", name: "Kashba", bn_name: "কসবা", upazila_id: "upa-82" },
//         { id: "uni-933", name: "Khalia", bn_name: "খালিয়া", upazila_id: "upa-82" },
//         { id: "uni-934", name: "Kumari", bn_name: "কুমারী", upazila_id: "upa-82" },
//         { id: "uni-935", name: "Mrigi", bn_name: "মৃগী", upazila_id: "upa-82" },
//         { id: "uni-936", name: "Mulghar", bn_name: "মুলঘর", upazila_id: "upa-82" },
//         { id: "uni-937", name: "Pangsha", bn_name: "পাংশা", upazila_id: "upa-82" },
//         { id: "uni-938", name: "Parulia", bn_name: "পরুলিয়া", upazila_id: "upa-82" },
//         { id: "uni-939", name: "Rajanagar", bn_name: "রাজানগর", upazila_id: "upa-82" },
//         { id: "uni-940", name: "Ratandia", bn_name: "রতনদিয়া", upazila_id: "upa-82" },
//         { id: "uni-941", name: "Sayedpur", bn_name: "সৈয়দপুর", upazila_id: "upa-82" },
//         { id: "uni-942", name: "Shilmandi", bn_name: "শিলমান্দী", upazila_id: "upa-82" }
//       ]
//     },
//     {
//       id: "upa-83",
//       name: "Kalukhali",
//       bn_name: "কালুখালী",
//       district_id: "dis-11",
//       unions: [
//         { id: "uni-943", name: "Bahadurpur", bn_name: "বাহাদুরপুর", upazila_id: "upa-83" },
//         { id: "uni-944", name: "Baliakandi", bn_name: "বালিয়াকান্দি", upazila_id: "upa-83" },
//         { id: "uni-945", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-83" },
//         { id: "uni-946", name: "Bhabanipur", bn_name: "ভবানীপুর", upazila_id: "upa-83" },
//         { id: "uni-947", name: "Chandoni", bn_name: "চন্দনী", upazila_id: "upa-83" },
//         { id: "uni-948", name: "Dariapur", bn_name: "দরিয়াপুর", upazila_id: "upa-83" },
//         { id: "uni-949", name: "Dhaneshwargati", bn_name: "ধনেশ্বরগাতী", upazila_id: "upa-83" },
//         { id: "uni-950", name: "Kalukhali", bn_name: "কালুখালী", upazila_id: "upa-83" },
//         { id: "uni-951", name: "Mrigi", bn_name: "মৃগী", upazila_id: "upa-83" },
//         { id: "uni-952", name: "Mulghar", bn_name: "মুলঘর", upazila_id: "upa-83" },
//         { id: "uni-953", name: "Pangsha", bn_name: "পাংশা", upazila_id: "upa-83" },
//         { id: "uni-954", name: "Rajanagar", bn_name: "রাজানগর", upazila_id: "upa-83" },
//         { id: "uni-955", name: "Ratandia", bn_name: "রতনদিয়া", upazila_id: "upa-83" },
//         { id: "uni-956", name: "Shilmandi", bn_name: "শিলমান্দী", upazila_id: "upa-83" }
//       ]
//     }
//   ]
// },

//        {
//   id: "dis-12",
//   name: "Shariatpur",
//   bn_name: "শরীয়তপুর",
//   division_id: "div-1",
//   upazilas: [
//     {
//       id: "upa-58",
//       name: "Shariatpur Sadar",
//       bn_name: "শরীয়তপুর সদর",
//       district_id: "dis-12",
//       unions: [
//         { id: "uni-565", name: "Angaria", bn_name: "আংগারিয়া", upazila_id: "upa-58" },
//         { id: "uni-566", name: "Chikandi", bn_name: "চিকান্দি", upazila_id: "upa-58" },
//         { id: "uni-567", name: "Chitolia", bn_name: "চিতলিয়া", upazila_id: "upa-58" },
//         { id: "uni-568", name: "D.M. Khali", bn_name: "ডি.এম. খালী", upazila_id: "upa-58" },
//         { id: "uni-569", name: "Dinga Manik", bn_name: "ডিংগা মানিক", upazila_id: "upa-58" },
//         { id: "uni-570", name: "Fatehpur", bn_name: "ফতেহপুর", upazila_id: "upa-58" },
//         { id: "uni-571", name: "Gharisar", bn_name: "ঘরিশার", upazila_id: "upa-58" },
//         { id: "uni-572", name: "Kachikata", bn_name: "কাচিকাটা", upazila_id: "upa-58" },
//         { id: "uni-573", name: "Kodalpur", bn_name: "কোদালপুর", upazila_id: "upa-58" },
//         { id: "uni-574", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-58" },
//         { id: "uni-575", name: "Nager Para", bn_name: "নগর পাড়া", upazila_id: "upa-58" },
//         { id: "uni-576", name: "Shariatpur", bn_name: "শরীয়তপুর", upazila_id: "upa-58" },
//         { id: "uni-577", name: "Tulasar", bn_name: "তুলাসার", upazila_id: "upa-58" },
//         { id: "uni-578", name: "Uzirpur", bn_name: "উজিরপুর", upazila_id: "upa-58" }
//       ]
//     },
//     {
//       id: "upa-84",
//       name: "Naria",
//       bn_name: "নড়িয়া",
//       district_id: "dis-12",
//       unions: [
//         { id: "uni-957", name: "Bhojeshwar", bn_name: "ভোজেশ্বর", upazila_id: "upa-84" },
//         { id: "uni-958", name: "Chardoulatkhan", bn_name: "চরদৌলতখান", upazila_id: "upa-84" },
//         { id: "uni-959", name: "Charmadhua", bn_name: "চরমধুয়া", upazila_id: "upa-84" },
//         { id: "uni-960", name: "Charatra", bn_name: "চরআত্রা", upazila_id: "upa-84" },
//         { id: "uni-961", name: "Dingamanik", bn_name: "ডিংগামানিক", upazila_id: "upa-84" },
//         { id: "uni-962", name: "Fategarh", bn_name: "ফতেগড়", upazila_id: "upa-84" },
//         { id: "uni-963", name: "Gharisar", bn_name: "ঘরিশার", upazila_id: "upa-84" },
//         { id: "uni-964", name: "Japsa", bn_name: "জাপসা", upazila_id: "upa-84" },
//         { id: "uni-965", name: "Kedarpur", bn_name: "কেদারপুর", upazila_id: "upa-84" },
//         { id: "uni-966", name: "Muktarerchar", bn_name: "মুক্তারেরচর", upazila_id: "upa-84" },
//         { id: "uni-967", name: "Naria", bn_name: "নড়িয়া", upazila_id: "upa-84" },
//         { id: "uni-968", name: "Noapara", bn_name: "নোয়াপাড়া", upazila_id: "upa-84" },
//         { id: "uni-969", name: "Rajnagar", bn_name: "রাজনগর", upazila_id: "upa-84" },
//         { id: "uni-970", name: "Uzirpur", bn_name: "উজিরপুর", upazila_id: "upa-84" }
//       ]
//     },
//     {
//       id: "upa-85",
//       name: "Zajira",
//       bn_name: "জাজিরা",
//       district_id: "dis-12",
//       unions: [
//         { id: "uni-971", name: "Bara Gopalpur", bn_name: "বড় গোপালপুর", upazila_id: "upa-85" },
//         { id: "uni-972", name: "Barakandi", bn_name: "বড়কান্দি", upazila_id: "upa-85" },
//         { id: "uni-973", name: "Bilaspur", bn_name: "বিলাসপুর", upazila_id: "upa-85" },
//         { id: "uni-974", name: "Brahmmapur", bn_name: "ব্রাহ্মপুর", upazila_id: "upa-85" },
//         { id: "uni-975", name: "Char Bhaga", bn_name: "চরভাগা", upazila_id: "upa-85" },
//         { id: "uni-976", name: "Char Kadira", bn_name: "চরকাদিরা", upazila_id: "upa-85" },
//         { id: "uni-977", name: "D.M. Khali", bn_name: "ডি.এম. খালী", upazila_id: "upa-85" },
//         { id: "uni-978", name: "Dogachi", bn_name: "দোগাছী", upazila_id: "upa-85" },
//         { id: "uni-979", name: "Kundarchar", bn_name: "কুন্ডেরচর", upazila_id: "upa-85" },
//         { id: "uni-980", name: "Mulna", bn_name: "মূলনা", upazila_id: "upa-85" },
//         { id: "uni-981", name: "Nager Para", bn_name: "নগর পাড়া", upazila_id: "upa-85" },
//         { id: "uni-982", name: "Palerchar", bn_name: "পালেরচর", upazila_id: "upa-85" },
//         { id: "uni-983", name: "Purba Naodoba", bn_name: "পূর্ব নাওডোবা", upazila_id: "upa-85" },
//         { id: "uni-984", name: "Senerchar", bn_name: "সেনেরচর", upazila_id: "upa-85" },
//         { id: "uni-985", name: "Zajira", bn_name: "জাজিরা", upazila_id: "upa-85" }
//       ]
//     },
//     {
//       id: "upa-86",
//       name: "Gosairhat",
//       bn_name: "গোসাইরহাট",
//       district_id: "dis-12",
//       unions: [
//         { id: "uni-986", name: "Alfadanga", bn_name: "আলফাডাঙ্গা", upazila_id: "upa-86" },
//         { id: "uni-987", name: "Banshbaria", bn_name: "বাঁশবাড়িয়া", upazila_id: "upa-86" },
//         { id: "uni-988", name: "Charkumaria", bn_name: "চরকুমারিয়া", upazila_id: "upa-86" },
//         { id: "uni-989", name: "Chiduria", bn_name: "চিদুরিয়া", upazila_id: "upa-86" },
//         { id: "uni-990", name: "Gariberchar", bn_name: "গারিবেরচর", upazila_id: "upa-86" },
//         { id: "uni-991", name: "Gosairhat", bn_name: "গোসাইরহাট", upazila_id: "upa-86" },
//         { id: "uni-992", name: "Imampur", bn_name: "ইমামপুর", upazila_id: "upa-86" },
//         { id: "uni-993", name: "Kodalpur", bn_name: "কোদালপুর", upazila_id: "upa-86" },
//         { id: "uni-994", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-86" },
//         { id: "uni-995", name: "Nalmuri", bn_name: "নলমুড়ি", upazila_id: "upa-86" },
//         { id: "uni-996", name: "Samantasar", bn_name: "সামন্তসার", upazila_id: "upa-86" },
//         { id: "uni-997", name: "Shulpara", bn_name: "শূলপাড়া", upazila_id: "upa-86" },
//         { id: "uni-998", name: "Tulasar", bn_name: "তুলাসার", upazila_id: "upa-86" }
//       ]
//     },
//     {
//       id: "upa-87",
//       name: "Bhedarganj",
//       bn_name: "ভেদরগঞ্জ",
//       district_id: "dis-12",
//       unions: [
//         { id: "uni-999", name: "Bhedarganj", bn_name: "ভেদরগঞ্জ", upazila_id: "upa-87" },
//         { id: "uni-1000", name: "Chikandi", bn_name: "চিকান্দি", upazila_id: "upa-87" },
//         { id: "uni-1001", name: "Chitolia", bn_name: "চিতলিয়া", upazila_id: "upa-87" },
//         { id: "uni-1002", name: "D.M. Khali", bn_name: "ডি.এম. খালী", upazila_id: "upa-87" },
//         { id: "uni-1003", name: "Dingamanik", bn_name: "ডিংগামানিক", upazila_id: "upa-87" },
//         { id: "uni-1004", name: "Fatehpur", bn_name: "ফতেহপুর", upazila_id: "upa-87" },
//         { id: "uni-1005", name: "Gharisar", bn_name: "ঘরিশার", upazila_id: "upa-87" },
//         { id: "uni-1006", name: "Kachikata", bn_name: "কাচিকাটা", upazila_id: "upa-87" },
//         { id: "uni-1007", name: "Kodalpur", bn_name: "কোদালপুর", upazila_id: "upa-87" },
//         { id: "uni-1008", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-87" },
//         { id: "uni-1009", name: "Nager Para", bn_name: "নগর পাড়া", upazila_id: "upa-87" },
//         { id: "uni-1010", name: "Rajnagar", bn_name: "রাজনগর", upazila_id: "upa-87" },
//         { id: "uni-1011", name: "Shariatpur", bn_name: "শরীয়তপুর", upazila_id: "upa-87" },
//         { id: "uni-1012", name: "Tulasar", bn_name: "তুলাসার", upazila_id: "upa-87" },
//         { id: "uni-1013", name: "Uzirpur", bn_name: "উজিরপুর", upazila_id: "upa-87" }
//       ]
//     },
//     {
//       id: "upa-88",
//       name: "Damudya",
//       bn_name: "ডামুড্যা",
//       district_id: "dis-12",
//       unions: [
//         { id: "uni-1014", name: "Damudya", bn_name: "ডামুড্যা", upazila_id: "upa-88" },
//         { id: "uni-1015", name: "Darul Aman", bn_name: "দারুল আমান", upazila_id: "upa-88" },
//         { id: "uni-1016", name: "Dhanuka", bn_name: "ধানুকা", upazila_id: "upa-88" },
//         { id: "uni-1017", name: "Gariberchar", bn_name: "গারিবেরচর", upazila_id: "upa-88" },
//         { id: "uni-1018", name: "Islampur", bn_name: "ইসলামপুর", upazila_id: "upa-88" },
//         { id: "uni-1019", name: "Kaneshar", bn_name: "কানেশ্বর", upazila_id: "upa-88" },
//         { id: "uni-1020", name: "Purba Damudya", bn_name: "পূর্ব ডামুড্যা", upazila_id: "upa-88" },
//         { id: "uni-1021", name: "Sidulkura", bn_name: "সিদুলকুড়া", upazila_id: "upa-88" },
//         { id: "uni-1022", name: "Sidya", bn_name: "সিড্যা", upazila_id: "upa-88" },
//         { id: "uni-1023", name: "Sreedharpur", bn_name: "শ্রীধরপুর", upazila_id: "upa-88" }
//       ]
//     }
//   ]
// },

//         {
//           id: "dis-13",
//           name: "Tangail",
//           bn_name: "টাঙ্গাইল",
//           division_id: "div-1",
//           upazilas: [
//             {
//               id: "upa-59",
//               name: "Tangail Sadar",
//               bn_name: "টাঙ্গাইল সদর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-579", name: "Akur Takur", bn_name: "আকুর তাকুর", upazila_id: "upa-59" },
//                 { id: "uni-580", name: "Baghil", bn_name: "বাঘিল", upazila_id: "upa-59" },
//                 { id: "uni-581", name: "Baghil", bn_name: "বাঘিল", upazila_id: "upa-59" },
//                 { id: "uni-582", name: "Balia", bn_name: "বালিয়া", upazila_id: "upa-59" },
//                 { id: "uni-583", name: "Baniajan", bn_name: "বানিয়াজান", upazila_id: "upa-59" },
//                 { id: "uni-584", name: "Banshtail", bn_name: "বাঁশতৈল", upazila_id: "upa-59" },
//                                 { id: "uni-585", name: "Bara Jalia", bn_name: "বড় জালিয়া", upazila_id: "upa-59" },
//                 { id: "uni-586", name: "Barabari", bn_name: "বারাবাড়ী", upazila_id: "upa-59" },
//                 { id: "uni-587", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-59" },
//                 { id: "uni-588", name: "Basail", bn_name: "বাসাইল", upazila_id: "upa-59" },
//                 { id: "uni-589", name: "Bashail", bn_name: "বাসাইল", upazila_id: "upa-59" },
//                 { id: "uni-590", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-59" },
//                 { id: "uni-591", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-59" },
//                 { id: "uni-592", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-59" },
//                 { id: "uni-593", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-59" },
//                 { id: "uni-594", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-59" },
//                 { id: "uni-595", name: "Gala", bn_name: "গালা", upazila_id: "upa-59" },
//                 { id: "uni-596", name: "Ghatail", bn_name: "ঘাটাইল", upazila_id: "upa-59" },
//                 { id: "uni-597", name: "Gobindashi", bn_name: "গোবিন্দাশী", upazila_id: "upa-59" },
//                 { id: "uni-598", name: "Gohail", bn_name: "গোহাইল", upazila_id: "upa-59" },
//                 { id: "uni-599", name: "Gopalpur", bn_name: "গোপালপুর", upazila_id: "upa-59" },
//                 { id: "uni-600", name: "Hemnagar", bn_name: "হেমনগর", upazila_id: "upa-59" },
//                 { id: "uni-601", name: "Jadunathpur", bn_name: "যদুনাথপুর", upazila_id: "upa-59" },
//                 { id: "uni-602", name: "Jagannathpur", bn_name: "জগন্নাথপুর", upazila_id: "upa-59" },
//                 { id: "uni-603", name: "Kagmari", bn_name: "কাগমারী", upazila_id: "upa-59" },
//                 { id: "uni-604", name: "Kakua", bn_name: "কাকুয়া", upazila_id: "upa-59" },
//                 { id: "uni-605", name: "Kalihati", bn_name: "কালিহাটী", upazila_id: "upa-59" },
//                 { id: "uni-606", name: "Kashil", bn_name: "কাশিল", upazila_id: "upa-59" },
//                 { id: "uni-607", name: "Kashimpur", bn_name: "কাশিমপুর", upazila_id: "upa-59" },
//                 { id: "uni-608", name: "Khanepur", bn_name: "খানেপুর", upazila_id: "upa-59" },
//                 { id: "uni-609", name: "Kochua", bn_name: "কচুয়া", upazila_id: "upa-59" },
//                 { id: "uni-610", name: "Kokdahara", bn_name: "কোকডহরা", upazila_id: "upa-59" },
//                 { id: "uni-611", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-59" },
//                 { id: "uni-612", name: "Madhupur", bn_name: "মধুপুর", upazila_id: "upa-59" },
//                 { id: "uni-613", name: "Mahamudnagar", bn_name: "মাহমুদনগর", upazila_id: "upa-59" },
//                 { id: "uni-614", name: "Mahera", bn_name: "মাহেরা", upazila_id: "upa-59" },
//                 { id: "uni-615", name: "Maijbagh", bn_name: "মাইজবাগ", upazila_id: "upa-59" },
//                 { id: "uni-616", name: "Maowa", bn_name: "মাওয়া", upazila_id: "upa-59" },
//                 { id: "uni-617", name: "Mirzapur", bn_name: "মির্জাপুর", upazila_id: "upa-59" },
//                 { id: "uni-618", name: "Mogra", bn_name: "মোগড়া", upazila_id: "upa-59" },
//                 { id: "uni-619", name: "Mohanpur", bn_name: "মোহনপুর", upazila_id: "upa-59" },
//                 { id: "uni-620", name: "Nagarpur", bn_name: "নাগরপুর", upazila_id: "upa-59" },
//                 { id: "uni-621", name: "Naldanga", bn_name: "নলডাঙ্গা", upazila_id: "upa-59" },
//                 { id: "uni-622", name: "Narandia", bn_name: "নারান্দিয়া", upazila_id: "upa-59" },
//                 { id: "uni-623", name: "Nasirpur", bn_name: "নাসিরপুর", upazila_id: "upa-59" },
//                 { id: "uni-624", name: "Pathrail", bn_name: "পাথরাইল", upazila_id: "upa-59" },
//                 { id: "uni-625", name: "Purabari", bn_name: "পুরাবাড়ী", upazila_id: "upa-59" },
//                 { id: "uni-626", name: "Rajabari", bn_name: "রাজাবাড়ী", upazila_id: "upa-59" },
//                 { id: "uni-627", name: "Rasulpur", bn_name: "রসুলপুর", upazila_id: "upa-59" },
//                 { id: "uni-628", name: "Salimpur", bn_name: "সালিমপুর", upazila_id: "upa-59" },
//                 { id: "uni-629", name: "Salthia", bn_name: "সালথিয়া", upazila_id: "upa-59" },
//                 { id: "uni-630", name: "Santosh", bn_name: "সন্তোষ", upazila_id: "upa-59" },
//                 { id: "uni-631", name: "Sarishabari", bn_name: "সরিষাবাড়ী", upazila_id: "upa-59" },
//                 { id: "uni-632", name: "Shahidnagar", bn_name: "শহীদনগর", upazila_id: "upa-59" },
//                 { id: "uni-633", name: "Shamaspur", bn_name: "শামাসপুর", upazila_id: "upa-59" },
//                 { id: "uni-634", name: "Shimulia", bn_name: "শিমুলিয়া", upazila_id: "upa-59" },
//                 { id: "uni-635", name: "Sholakuri", bn_name: "শোলাকুড়ি", upazila_id: "upa-59" },
//                 { id: "uni-636", name: "Sreefaltali", bn_name: "শ্রীফলতলী", upazila_id: "upa-59" },
//                 { id: "uni-637", name: "Tangail", bn_name: "টাঙ্গাইল", upazila_id: "upa-59" },
//                 { id: "uni-638", name: "Tarafpur", bn_name: "তরফপুর", upazila_id: "upa-59" },
//                 { id: "uni-639", name: "Tentul", bn_name: "তেঁতুল", upazila_id: "upa-59" },
//                 { id: "uni-640", name: "Uthali", bn_name: "উথলী", upazila_id: "upa-59" }
//               ]
//             },
//             {
//               id: "upa-60",
//               name: "Basail",
//               bn_name: "বাসাইল",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-641", name: "Basail", bn_name: "বাসাইল", upazila_id: "upa-60" },
//                 { id: "uni-642", name: "Fulki", bn_name: "ফুলকী", upazila_id: "upa-60" },
//                 { id: "uni-643", name: "Habla", bn_name: "হাবলা", upazila_id: "upa-60" },
//                 { id: "uni-644", name: "Kanchanpur", bn_name: "কাঞ্চনপুর", upazila_id: "upa-60" },
//                 { id: "uni-645", name: "Kashil", bn_name: "কাশিল", upazila_id: "upa-60" },
//                 { id: "uni-646", name: "Kawraid", bn_name: "কাউরাইদ", upazila_id: "upa-60" },
//                 { id: "uni-647", name: "Radhakanai", bn_name: "রাধাকানাই", upazila_id: "upa-60" }
//               ]
//             },
//             {
//               id: "upa-61",
//               name: "Bhuapur",
//               bn_name: "ভুয়াপুর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-648", name: "Arjuna", bn_name: "অর্জুনা", upazila_id: "upa-61" },
//                 { id: "uni-649", name: "Baniajan", bn_name: "বানিয়াজান", upazila_id: "upa-61" },
//                 { id: "uni-650", name: "Bhuapur", bn_name: "ভুয়াপুর", upazila_id: "upa-61" },
//                 { id: "uni-651", name: "Birhati", bn_name: "বিরহাটী", upazila_id: "upa-61" },
//                 { id: "uni-652", name: "Gabsara", bn_name: "গাবসারা", upazila_id: "upa-61" },
//                 { id: "uni-653", name: "Gobindashi", bn_name: "গোবিন্দাশী", upazila_id: "upa-61" },
//                 { id: "uni-654", name: "Nikrail", bn_name: "নিকরাইল", upazila_id: "upa-61" }
//               ]
//             },
//             {
//               id: "upa-62",
//               name: "Delduar",
//               bn_name: "দেলদুয়ার",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-655", name: "Atia", bn_name: "আটিয়া", upazila_id: "upa-62" },
//                 { id: "uni-656", name: "Delduar", bn_name: "দেলদুয়ার", upazila_id: "upa-62" },
//                 { id: "uni-657", name: "Deoli", bn_name: "দেওলী", upazila_id: "upa-62" },
//                 { id: "uni-658", name: "Dubail", bn_name: "ডুবাইল", upazila_id: "upa-62" },
//                 { id: "uni-659", name: "Elasin", bn_name: "এলাসিন", upazila_id: "upa-62" },
//                 { id: "uni-660", name: "Fazilhati", bn_name: "ফাজিলহাটী", upazila_id: "upa-62" },
//                 { id: "uni-661", name: "Lauhati", bn_name: "লাউহাটী", upazila_id: "upa-62" },
//                 { id: "uni-662", name: "Pathrail", bn_name: "পাথরাইল", upazila_id: "upa-62" }
//               ]
//             },
//             {
//               id: "upa-63",
//               name: "Ghatail",
//               bn_name: "ঘাটাইল",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-663", name: "Anehola", bn_name: "আনেহলা", upazila_id: "upa-63" },
//                 { id: "uni-664", name: "Deopara", bn_name: "দেওপাড়া", upazila_id: "upa-63" },
//                 { id: "uni-665", name: "Dhalapara", bn_name: "ধলাপাড়া", upazila_id: "upa-63" },
//                 { id: "uni-666", name: "Digalkanda", bn_name: "দিগলকান্দা", upazila_id: "upa-63" },
//                 { id: "uni-667", name: "Digar", bn_name: "দিগড়", upazila_id: "upa-63" },
//                 { id: "uni-668", name: "Ghatail", bn_name: "ঘাটাইল", upazila_id: "upa-63" },
//                 { id: "uni-669", name: "Jamuria", bn_name: "জামুরিয়া", upazila_id: "upa-63" },
//                 { id: "uni-670", name: "Lokerpara", bn_name: "লোকেরপাড়া", upazila_id: "upa-63" },
//                 { id: "uni-671", name: "Rasulpur", bn_name: "রসুলপুর", upazila_id: "upa-63" },
//                 { id: "uni-672", name: "Sandhanpur", bn_name: "সন্ধানপুর", upazila_id: "upa-63" }
//               ]
//             },
//             {
//               id: "upa-64",
//               name: "Gopalpur",
//               bn_name: "গোপালপুর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-673", name: "Aloa", bn_name: "আলোয়া", upazila_id: "upa-64" },
//                 { id: "uni-674", name: "Dhopakhali", bn_name: "ধোপাখালী", upazila_id: "upa-64" },
//                 { id: "uni-675", name: "Gopalpur", bn_name: "গোপালপুর", upazila_id: "upa-64" },
//                 { id: "uni-676", name: "Hadera", bn_name: "হাদিরা", upazila_id: "upa-64" },
//                 { id: "uni-677", name: "Hemnagar", bn_name: "হেমনগর", upazila_id: "upa-64" },
//                 { id: "uni-678", name: "Jadunathpur", bn_name: "যদুনাথপুর", upazila_id: "upa-64" },
//                 { id: "uni-679", name: "Khangaon", bn_name: "খাঙ্গাওন", upazila_id: "upa-64" },
//                 { id: "uni-680", name: "Kochua", bn_name: "কচুয়া", upazila_id: "upa-64" },
//                 { id: "uni-681", name: "Lakshmipur", bn_name: "লক্ষ্মীপুর", upazila_id: "upa-64" },
//                 { id: "uni-682", name: "Rampur", bn_name: "রামপুর", upazila_id: "upa-64" }
//               ]
//             },
//             {
//               id: "upa-65",
//               name: "Kalihati",
//               bn_name: "কালিহাটী",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-683", name: "Balla", bn_name: "বাল্লা", upazila_id: "upa-65" },
//                 { id: "uni-684", name: "Baria", bn_name: "বাড়ীয়া", upazila_id: "upa-65" },
//                 { id: "uni-685", name: "Basan", bn_name: "বাসন", upazila_id: "upa-65" },
//                 { id: "uni-686", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-65" },
//                 { id: "uni-687", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-65" },
//                 { id: "uni-688", name: "Dhanbari", bn_name: "ধানবাড়ী", upazila_id: "upa-65" },
//                 { id: "uni-689", name: "Durgapur", bn_name: "দুর্গাপুর", upazila_id: "upa-65" },
//                 { id: "uni-690", name: "Elangi", bn_name: "এলাঙ্গী", upazila_id: "upa-65" },
//                 { id: "uni-691", name: "Fatehpur", bn_name: "ফতেহপুর", upazila_id: "upa-65" },
//                 { id: "uni-692", name: "Gohaliabari", bn_name: "গোহালিয়াবাড়ী", upazila_id: "upa-65" },
//                 { id: "uni-693", name: "Kalihati", bn_name: "কালিহাটী", upazila_id: "upa-65" },
//                 { id: "uni-694", name: "Kashil", bn_name: "কাশিল", upazila_id: "upa-65" },
//                 { id: "uni-695", name: "Khangaon", bn_name: "খাঙ্গাওন", upazila_id: "upa-65" },
//                 { id: "uni-696", name: "Kochua", bn_name: "কচুয়া", upazila_id: "upa-65" },
//                 { id: "uni-697", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-65" },
//                 { id: "uni-698", name: "Nagbari", bn_name: "নাগবাড়ী", upazila_id: "upa-65" },
//                 { id: "uni-699", name: "Narandia", bn_name: "নারান্দিয়া", upazila_id: "upa-65" },
//                 { id: "uni-700", name: "Pakutia", bn_name: "পাকুটিয়া", upazila_id: "upa-65" },
//                 { id: "uni-701", name: "Sahadebpur", bn_name: "সহদেবপুর", upazila_id: "upa-65" }
//               ]
//             },
//             {
//               id: "upa-66",
//               name: "Madhupur",
//               bn_name: "মধুপুর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-702", name: "Alokdia", bn_name: "আলোকদিয়া", upazila_id: "upa-66" },
//                 { id: "uni-703", name: "Arankhola", bn_name: "আড়ানখোলা", upazila_id: "upa-66" },
//                 { id: "uni-704", name: "Ausnara", bn_name: "আউসনারা", upazila_id: "upa-66" },
//                 { id: "uni-705", name: "Golabari", bn_name: "গোলাবাড়ী", upazila_id: "upa-66" },
//                 { id: "uni-706", name: "Madhupur", bn_name: "মধুপুর", upazila_id: "upa-66" },
//                 { id: "uni-707", name: "Mirzapur", bn_name: "মির্জাপুর", upazila_id: "upa-66" },
//                 { id: "uni-708", name: "Saturia", bn_name: "সাটুরিয়া", upazila_id: "upa-66" }
//               ]
//             },
//             {
//               id: "upa-67",
//               name: "Mirzapur",
//               bn_name: "মির্জাপুর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-709", name: "Ajgana", bn_name: "আজগানা", upazila_id: "upa-67" },
//                 { id: "uni-710", name: "Anaitara", bn_name: "আনাইতারা", upazila_id: "upa-67" },
//                 { id: "uni-711", name: "Banshtail", bn_name: "বাঁশতৈল", upazila_id: "upa-67" },
//                 { id: "uni-712", name: "Bhaora", bn_name: "ভাওরা", upazila_id: "upa-67" },
//                 { id: "uni-713", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-67" },
//                 { id: "uni-714", name: "Fatehpur", bn_name: "ফতেহপুর", upazila_id: "upa-67" },
//                 { id: "uni-715", name: "Gorai", bn_name: "গড়াই", upazila_id: "upa-67" },
//                 { id: "uni-716", name: "Gorai", bn_name: "গড়াই", upazila_id: "upa-67" },
//                 { id: "uni-717", name: "Jamurki", bn_name: "জামুরকী", upazila_id: "upa-67" },
//                 { id: "uni-718", name: "M.C. Char", bn_name: "এম.সি. চর", upazila_id: "upa-67" },
//                 { id: "uni-719", name: "Mahera", bn_name: "মাহেরা", upazila_id: "upa-67" },
//                 { id: "uni-720", name: "Mirzapur", bn_name: "মির্জাপুর", upazila_id: "upa-67" },
//                 { id: "uni-721", name: "Mollah Para", bn_name: "মোল্লাপাড়া", upazila_id: "upa-67" },
//                 { id: "uni-722", name: "Rupasi", bn_name: "রূপসী", upazila_id: "upa-67" },
//                 { id: "uni-723", name: "Tarafpur", bn_name: "তরফপুর", upazila_id: "upa-67" },
//                 { id: "uni-724", name: "Tenguria", bn_name: "টেংগুরিয়া", upazila_id: "upa-67" }
//               ]
//             },
//             {
//               id: "upa-68",
//               name: "Nagarpur",
//               bn_name: "নাগরপুর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-725", name: "Balla", bn_name: "বাল্লা", upazila_id: "upa-68" },
//                 { id: "uni-726", name: "Baniajan", bn_name: "বানিয়াজান", upazila_id: "upa-68" },
//                 { id: "uni-727", name: "Banshtail", bn_name: "বাঁশতৈল", upazila_id: "upa-68" },
//                 { id: "uni-728", name: "Bara Palashbari", bn_name: "বড় পলাশবাড়ী", upazila_id: "upa-68" },
//                 { id: "uni-729", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-68" },
//                 { id: "uni-730", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-68" },
//                 { id: "uni-731", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-68" },
//                 { id: "uni-732", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-68" },
//                 { id: "uni-733", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-68" },
//                 { id: "uni-734", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-68" },
//                 { id: "uni-735", name: "Durgapur", bn_name: "দুর্গাপুর", upazila_id: "upa-68" },
//                 { id: "uni-736", name: "Gala", bn_name: "গালা", upazila_id: "upa-68" },
//                 { id: "uni-737", name: "Gobindashi", bn_name: "গোবিন্দাশী", upazila_id: "upa-68" },
//                 { id: "uni-738", name: "Gohail", bn_name: "গোহাইল", upazila_id: "upa-68" },
//                 { id: "uni-739", name: "Kachua", bn_name: "কচুয়া", upazila_id: "upa-68" },
//                 { id: "uni-740", name: "Kashil", bn_name: "কাশিল", upazila_id: "upa-68" },
//                 { id: "uni-741", name: "Kashimpur", bn_name: "কাশিমপুর", upazila_id: "upa-68" },
//                 { id: "uni-742", name: "Khanepur", bn_name: "খানেপুর", upazila_id: "upa-68" },
//                 { id: "uni-743", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-68" },
//                 { id: "uni-744", name: "Nagarpur", bn_name: "নাগরপুর", upazila_id: "upa-68" },
//                 { id: "uni-745", name: "Pakutia", bn_name: "পাকুটিয়া", upazila_id: "upa-68" },
//                 { id: "uni-746", name: "Salimpur", bn_name: "সালিমপুর", upazila_id: "upa-68" },
//                 { id: "uni-747", name: "Salthia", bn_name: "সালথিয়া", upazila_id: "upa-68" },
//                 { id: "uni-748", name: "Saturia", bn_name: "সাটুরিয়া", upazila_id: "upa-68" }
//               ]
//             },
//             {
//               id: "upa-69",
//               name: "Sakhipur",
//               bn_name: "সখিপুর",
//               district_id: "dis-13",
//               unions: [
//                 { id: "uni-749", name: "Balla", bn_name: "বাল্লা", upazila_id: "upa-69" },
//                 { id: "uni-750", name: "Baniajan", bn_name: "বানিয়াজান", upazila_id: "upa-69" },
//                 { id: "uni-751", name: "Banshtail", bn_name: "বাঁশতৈল", upazila_id: "upa-69" },
//                 { id: "uni-752", name: "Basantapur", bn_name: "বসন্তপুর", upazila_id: "upa-69" },
//                 { id: "uni-753", name: "Bhatram", bn_name: "ভাট্রাম", upazila_id: "upa-69" },
//                 { id: "uni-754", name: "Bisha", bn_name: "বিশা", upazila_id: "upa-69" },
//                 { id: "uni-755", name: "Chandhar", bn_name: "চান্ধার", upazila_id: "upa-69" },
//                 { id: "uni-756", name: "Dhamswar", bn_name: "ধামস্বর", upazila_id: "upa-69" },
//                 { id: "uni-757", name: "Dighalia", bn_name: "দিঘলিয়া", upazila_id: "upa-69" },
//                 { id: "uni-758", name: "Kachua", bn_name: "কচুয়া", upazila_id: "upa-69" },
//                 { id: "uni-759", name: "Kashil", bn_name: "কাশিল", upazila_id: "upa-69" },
//                 { id: "uni-760", name: "Kashimpur", bn_name: "কাশিমপুর", upazila_id: "upa-69" },
//                 { id: "uni-761", name: "Khanepur", bn_name: "খানেপুর", upazila_id: "upa-69" },
//                 { id: "uni-762", name: "Kumarbhog", bn_name: "কুমারভোগ", upazila_id: "upa-69" },
//                 { id: "uni-763", name: "Sakhipur", bn_name: "সখিপুর", upazila_id: "upa-69" },
//                 { id: "uni-764", name: "Salimpur", bn_name: "সালিমপুর", upazila_id: "upa-69" },
//                 { id: "uni-765", name: "Salthia", bn_name: "সালথিয়া", upazila_id: "upa-69" }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };





// {
//   id: "div-2",
//   name: "Chittagong",
//   bn_name: "চট্টগ্রাম",
//   districts: [
//     {
//       id: "dis-14",
//       name: "Chittagong",
//       bn_name: "চট্টগ্রাম",
//       division_id: "div-2",
//       upazilas: [
//         {
//           id: "upa-89",
//           name: "Chittagong Port",
//           bn_name: "চট্টগ্রাম বন্দর",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1024", name: "Bandar", bn_name: "বন্দর", upazila_id: "upa-89" },
//             { id: "uni-1025", name: "Chandgaon", bn_name: "চাঁদগাঁও", upazila_id: "upa-89" },
//             { id: "uni-1026", name: "Double Mooring", bn_name: "ডবল মুরিং", upazila_id: "upa-89" },
//             { id: "uni-1027", name: "Halishahar", bn_name: "হালিশহর", upazila_id: "upa-89" },
//             { id: "uni-1028", name: "Kotwali", bn_name: "কোতয়ালী", upazila_id: "upa-89" },
//             { id: "uni-1029", name: "Pahartali", bn_name: "পাহাড়তলী", upazila_id: "upa-89" },
//             { id: "uni-1030", name: "Panchlaish", bn_name: "পাঁচলাইশ", upazila_id: "upa-89" },
//             { id: "uni-1031", name: "Patenga", bn_name: "পতেঙ্গা", upazila_id: "upa-89" }
//           ]
//         },
//         {
//           id: "upa-90",
//           name: "Chandgaon",
//           bn_name: "চাঁদগাঁও",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1032", name: "Chandgaon", bn_name: "চাঁদগাঁও", upazila_id: "upa-90" },
//             { id: "uni-1033", name: "Kornelghat", bn_name: "কর্ণেলঘাট", upazila_id: "upa-90" },
//             { id: "uni-1034", name: "Mirsarai", bn_name: "মীরসরাই", upazila_id: "upa-90" }
//           ]
//         },
//         {
//           id: "upa-91",
//           name: "Double Mooring",
//           bn_name: "ডবল মুরিং",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1035", name: "Double Mooring", bn_name: "ডবল মুরিং", upazila_id: "upa-91" },
//             { id: "uni-1036", name: "Khulshi", bn_name: "খুলশী", upazila_id: "upa-91" },
//             { id: "uni-1037", name: "Lalkhan Bazar", bn_name: "লালখান বাজার", upazila_id: "upa-91" }
//           ]
//         },
//         {
//           id: "upa-92",
//           name: "Kotwali",
//           bn_name: "কোতয়ালী",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1038", name: "Anderkilla", bn_name: "আন্দরকিল্লা", upazila_id: "upa-92" },
//             { id: "uni-1039", name: "Bakalia", bn_name: "বাকলিয়া", upazila_id: "upa-92" },
//             { id: "uni-1040", name: "Chawkbazar", bn_name: "চকবাজার", upazila_id: "upa-92" },
//             { id: "uni-1041", name: "Kotwali", bn_name: "কোতয়ালী", upazila_id: "upa-92" },
//             { id: "uni-1042", name: "Sadarghat", bn_name: "সদরঘাট", upazila_id: "upa-92" }
//           ]
//         },
//         {
//           id: "upa-93",
//           name: "Pahartali",
//           bn_name: "পাহাড়তলী",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1043", name: "Pahartali", bn_name: "পাহাড়তলী", upazila_id: "upa-93" },
//             { id: "uni-1044", name: "Rampur", bn_name: "রামপুর", upazila_id: "upa-93" },
//             { id: "uni-1045", name: "Wazedia", bn_name: "ওয়াজেদিয়া", upazila_id: "upa-93" }
//           ]
//         },
//         {
//           id: "upa-94",
//           name: "Panchlaish",
//           bn_name: "পাঁচলাইশ",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1046", name: "Agrabad", bn_name: "আগ্রাবাদ", upazila_id: "upa-94" },
//             { id: "uni-1047", name: "GEC", bn_name: "জিইসি", upazila_id: "upa-94" },
//             { id: "uni-1048", name: "Khulshi", bn_name: "খুলশী", upazila_id: "upa-94" },
//             { id: "uni-1049", name: "Panchlaish", bn_name: "পাঁচলাইশ", upazila_id: "upa-94" }
//           ]
//         },
//         {
//           id: "upa-95",
//           name: "Bayejid",
//           bn_name: "বায়েজিদ",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1050", name: "Bayejid", bn_name: "বায়েজিদ", upazila_id: "upa-95" },
//             { id: "uni-1051", name: "Hathazari", bn_name: "হাটহাজারী", upazila_id: "upa-95" },
//             { id: "uni-1052", name: "Madarbari", bn_name: "মাদারবাড়ী", upazila_id: "upa-95" }
//           ]
//         },
//         {
//           id: "upa-96",
//           name: "Hathazari",
//           bn_name: "হাটহাজারী",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1053", name: "Burirchar", bn_name: "বুড়িরচর", upazila_id: "upa-96" },
//             { id: "uni-1054", name: "Chhagalnaiya", bn_name: "ছাগলনাইয়া", upazila_id: "upa-96" },
//             { id: "uni-1055", name: "Dharmapur", bn_name: "ধর্মপুর", upazila_id: "upa-96" },
//             { id: "uni-1056", name: "Dhopachhari", bn_name: "ধোপাছড়ি", upazila_id: "upa-96" },
//             { id: "uni-1057", name: "Forhadabad", bn_name: "ফরহাদাবাদ", upazila_id: "upa-96" },
//             { id: "uni-1058", name: "Garduara", bn_name: "গড়দুয়ারা", upazila_id: "upa-96" },
//             { id: "uni-1059", name: "Guman Mardan", bn_name: "গুমান মর্দন", upazila_id: "upa-96" },
//             { id: "uni-1060", name: "Hathazari", bn_name: "হাটহাজারী", upazila_id: "upa-96" },
//             { id: "uni-1061", name: "Katirhat", bn_name: "কাটিহার", upazila_id: "upa-96" },
//             { id: "uni-1062", name: "Madrasa", bn_name: "মাদ্রাসা", upazila_id: "upa-96" },
//             { id: "uni-1063", name: "Mirzapur", bn_name: "মির্জাপুর", upazila_id: "upa-96" },
//             { id: "uni-1064", name: "Narayanhat", bn_name: "নারায়ণহাট", upazila_id: "upa-96" },
//             { id: "uni-1065", name: "Rangunia", bn_name: "রাঙ্গুনিয়া", upazila_id: "upa-96" },
//             { id: "uni-1066", name: "Yunus Nagar", bn_name: "ইউনুস নগর", upazila_id: "upa-96" }
//           ]
//         },
//         {
//           id: "upa-97",
//           name: "Rangunia",
//           bn_name: "রাঙ্গুনিয়া",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1067", name: "Bara Uthan", bn_name: "বড় উত্তান", upazila_id: "upa-97" },
//             { id: "uni-1068", name: "Betagi", bn_name: "বেতাগী", upazila_id: "upa-97" },
//             { id: "uni-1069", name: "Charamba", bn_name: "চরম্বা", upazila_id: "upa-97" },
//             { id: "uni-1070", name: "Dhamair", bn_name: "ধামাইর", upazila_id: "upa-97" },
//             { id: "uni-1071", name: "Islampur", bn_name: "ইসলামপুর", upazila_id: "upa-97" },
//             { id: "uni-1072", name: "Kadalpur", bn_name: "কদলপুর", upazila_id: "upa-97" },
//             { id: "uni-1073", name: "Kharana", bn_name: "খড়না", upazila_id: "upa-97" },
//             { id: "uni-1074", name: "Mariumnagar", bn_name: "মরিয়মনগর", upazila_id: "upa-97" },
//             { id: "uni-1075", name: "Padua", bn_name: "পদুয়া", upazila_id: "upa-97" },
//             { id: "uni-1076", name: "Parua", bn_name: "পারুয়া", upazila_id: "upa-97" },
//             { id: "uni-1077", name: "Pomra", bn_name: "পোমরা", upazila_id: "upa-97" },
//             { id: "uni-1078", name: "Rangunia", bn_name: "রাঙ্গুনিয়া", upazila_id: "upa-97" },
//             { id: "uni-1079", name: "Sarapbhata", bn_name: "সরভভাটা", upazila_id: "upa-97" },
//             { id: "uni-1080", name: "Silok", bn_name: "শিলক", upazila_id: "upa-97" },
//             { id: "uni-1081", name: "South Rajashar", bn_name: "দক্ষিণ রাজাশার", upazila_id: "upa-97" }
//           ]
//         },
//         {
//           id: "upa-98",
//           name: "Sandwip",
//           bn_name: "সন্দ্বীপ",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1082", name: "Azimpur", bn_name: "আজিমপুর", upazila_id: "upa-98" },
//             { id: "uni-1083", name: "Bauria", bn_name: "বাউরিয়া", upazila_id: "upa-98" },
//             { id: "uni-1084", name: "Digpar", bn_name: "দিগপাড়", upazila_id: "upa-98" },
//             { id: "uni-1085", name: "Gachhua", bn_name: "গাছুয়া", upazila_id: "upa-98" },
//             { id: "uni-1086", name: "Kalapania", bn_name: "কালাপানিয়া", upazila_id: "upa-98" },
//             { id: "uni-1087", name: "Magdhara", bn_name: "মাগধারা", upazila_id: "upa-98" },
//             { id: "uni-1088", name: "Maitbhanga", bn_name: "মাইটভাঙ্গা", upazila_id: "upa-98" },
//             { id: "uni-1089", name: "Musapur", bn_name: "মুছাপুর", upazila_id: "upa-98" },
//             { id: "uni-1090", name: "Rahmatpur", bn_name: "রহমতপুর", upazila_id: "upa-98" },
//             { id: "uni-1091", name: "Santoshpur", bn_name: "সন্তোষপুর", upazila_id: "upa-98" },
//             { id: "uni-1092", name: "Sarikkhali", bn_name: "সরিকখালী", upazila_id: "upa-98" }
//           ]
//         },
//         {
//           id: "upa-99",
//           name: "Sitakunda",
//           bn_name: "সীতাকুণ্ড",
//           district_id: "dis-14",
//           unions: [
//             { id: "uni-1093", name: "Banshbaria", bn_name: "বাঁশবাড়িয়া", upazila_id: "upa-99" },
//             { id: "uni-1094", name: "Barabkunda", bn_name: "বারাবকুন্ড", upazila_id: "upa-99" },
//             { id: "uni-1095", name: "Bariadyala", bn_name: "বাড়িয়াডালা", upazila_id: "upa-99" },
//             { id: "uni-1096", name: "Bhatiari", bn_name: "ভাটিয়ারী", upazila_id: "upa-99" },
//             { id: "uni-1097", name: "Kumira", bn_name: "কুমিরা", upazila_id: "upa-99" },
//             { id: "uni-1098", name: "Maddhya Gohira", bn_name: "মধ্য গহিরা", upazila_id: "upa-99" },
//             { id: "uni-1099", name: "Muradpur", bn_name: "মুরাদপুর", upazila_id: "upa-99" },
//             { id: "uni-1100", name: "Saidpur", bn_name: "সৈয়দপুর", upazila_id: "upa-99" },
//             { id: "uni-1101", name: "Salimpur", bn_name: "সালিমপুর", upazila_id: "upa-99" },
//             { id: "uni-1102", name: "Sitakunda", bn_name: "সীতাকুণ্ড", upazila_id: "upa-99" }
//           ]
//         }
//       ]
//     },
//     {
//       id: "dis-15",
//       name: "Cox's Bazar",
//       bn_name: "কক্সবাজার",
//       division_id: "div-2",
//       upazilas: [
//         {
//           id: "upa-100",
//           name: "Cox's Bazar Sadar",
//           bn_name: "কক্সবাজার সদর",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1103", name: "Bharuakhali", bn_name: "ভরুয়াখালী", upazila_id: "upa-100" },
//             { id: "uni-1104", name: "Chakaria", bn_name: "চকরিয়া", upazila_id: "upa-100" },
//             { id: "uni-1105", name: "Chiringa", bn_name: "চিরিংগা", upazila_id: "upa-100" },
//             { id: "uni-1106", name: "Dakshin Mithachhari", bn_name: "দক্ষিণ মিঠাছড়ি", upazila_id: "upa-100" },
//             { id: "uni-1107", name: "Dulahazara", bn_name: "ডুলাহাজারা", upazila_id: "upa-100" },
//             { id: "uni-1108", name: "Eidgaon", bn_name: "ঈদগাঁও", upazila_id: "upa-100" },
//             { id: "uni-1109", name: "Islamabad", bn_name: "ইসলামাবাদ", upazila_id: "upa-100" },
//             { id: "uni-1110", name: "Jhilongjha", bn_name: "ঝিলংঝা", upazila_id: "upa-100" },
//             { id: "uni-1111", name: "Khurushkul", bn_name: "খুরুশকুল", upazila_id: "upa-100" },
//             { id: "uni-1112", name: "Pekua", bn_name: "পেকুয়া", upazila_id: "upa-100" },
//             { id: "uni-1113", name: "Ramu", bn_name: "রামু", upazila_id: "upa-100" },
//             { id: "uni-1114", name: "Whykong", bn_name: "হোয়াইকং", upazila_id: "upa-100" }
//           ]
//         },
//         {
//           id: "upa-101",
//           name: "Chakaria",
//           bn_name: "চকরিয়া",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1115", name: "Baraitali", bn_name: "বড়ইতলী", upazila_id: "upa-101" },
//             { id: "uni-1116", name: "Chakaria", bn_name: "চকরিয়া", upazila_id: "upa-101" },
//             { id: "uni-1117", name: "Dakshin Dhurung", bn_name: "দক্ষিণ ধুরুং", upazila_id: "upa-101" },
//             { id: "uni-1118", name: "Dhalghata", bn_name: "ধলঘাটা", upazila_id: "upa-101" },
//             { id: "uni-1119", name: "Fashiakhali", bn_name: "ফাঁসিয়াখালী", upazila_id: "upa-101" },
//             { id: "uni-1120", name: "Kaiarbil", bn_name: "কাইয়ারবিল", upazila_id: "upa-101" },
//             { id: "uni-1121", name: "Khuntakhali", bn_name: "খুন্তাখালী", upazila_id: "upa-101" },
//             { id: "uni-1122", name: "Konakhali", bn_name: "কোনাখালী", upazila_id: "upa-101" },
//             { id: "uni-1123", name: "Lakhyarchar", bn_name: "লক্ষ্যারচর", upazila_id: "upa-101" },
//             { id: "uni-1124", name: "Paschim Bara Bheola", bn_name: "পশ্চিম বড় ভেওলা", upazila_id: "upa-101" },
//             { id: "uni-1125", name: "Purba Bara Bheola", bn_name: "পুর্ব বড় ভেওলা", upazila_id: "upa-101" },
//             { id: "uni-1126", name: "Saharbil", bn_name: "সাহারবিল", upazila_id: "upa-101" }
//           ]
//         },
//         {
//           id: "upa-102",
//           name: "Kutubdia",
//           bn_name: "কুতুবদিয়া",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1127", name: "Ali Akbar Deil", bn_name: "আলী আকবর ডেইল", upazila_id: "upa-102" },
//             { id: "uni-1128", name: "Baragho", bn_name: "বাড়ঘো", upazila_id: "upa-102" },
//             { id: "uni-1129", name: "Dakshin Dhurung", bn_name: "দক্ষিণ ধুরুং", upazila_id: "upa-102" },
//             { id: "uni-1130", name: "Kaiarbil", bn_name: "কাইয়ারবিল", upazila_id: "upa-102" },
//             { id: "uni-1131", name: "Lemsikhali", bn_name: "লেমসিখালী", upazila_id: "upa-102" },
//             { id: "uni-1132", name: "Uttar Dhurung", bn_name: "উত্তর ধুরুং", upazila_id: "upa-102" }
//           ]
//         },
//         {
//           id: "upa-103",
//           name: "Maheshkhali",
//           bn_name: "মহেশখালী",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1133", name: "Bara Maheshkhali", bn_name: "বড় মহেশখালী", upazila_id: "upa-103" },
//             { id: "uni-1134", name: "Chota Maheshkhali", bn_name: "ছোট মহেশখালী", upazila_id: "upa-103" },
//             { id: "uni-1135", name: "Dhalghata", bn_name: "ধলঘাটা", upazila_id: "upa-103" },
//             { id: "uni-1136", name: "Hoanak", bn_name: "হোয়ানক", upazila_id: "upa-103" },
//             { id: "uni-1137", name: "Kutubjom", bn_name: "কুতুবজোম", upazila_id: "upa-103" },
//             { id: "uni-1138", name: "Matarbari", bn_name: "মাতারবাড়ী", upazila_id: "upa-103" },
//             { id: "uni-1139", name: "Shaplapur", bn_name: "শাপলাপুর", upazila_id: "upa-103" }
//           ]
//         },
//         {
//           id: "upa-104",
//           name: "Ramu",
//           bn_name: "রামু",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1140", name: "Chakmarkul", bn_name: "চাকমারকুল", upazila_id: "upa-104" },
//             { id: "uni-1141", name: "Dakshin Mithachhari", bn_name: "দক্ষিণ মিঠাছড়ি", upazila_id: "upa-104" },
//             { id: "uni-1142", name: "Fatekharkul", bn_name: "ফতেখারকুল", upazila_id: "upa-104" },
//             { id: "uni-1143", name: "Garjania", bn_name: "গর্জনিয়া", upazila_id: "upa-104" },
//             { id: "uni-1144", name: "Kachhapia", bn_name: "কচ্ছপিয়া", upazila_id: "upa-104" },
//             { id: "uni-1145", name: "Kauarkhop", bn_name: "কাউয়ারখোপ", upazila_id: "upa-104" },
//             { id: "uni-1146", name: "Khuniapalong", bn_name: "খুনিয়াপালং", upazila_id: "upa-104" },
//             { id: "uni-1147", name: "Ramu", bn_name: "রামু", upazila_id: "upa-104" }
//           ]
//         },
//         {
//           id: "upa-105",
//           name: "Teknaf",
//           bn_name: "টেকনাফ",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1148", name: "Baharchhara", bn_name: "বাহারছড়া", upazila_id: "upa-105" },
//             { id: "uni-1149", name: "Hnila", bn_name: "হ্নীলা", upazila_id: "upa-105" },
//             { id: "uni-1150", name: "Sabrang", bn_name: "সাবরাং", upazila_id: "upa-105" },
//             { id: "uni-1151", name: "St. Martin's Island", bn_name: "সেন্ট মার্টিন্স দ্বীপ", upazila_id: "upa-105" },
//             { id: "uni-1152", name: "Teknaf", bn_name: "টেকনাফ", upazila_id: "upa-105" },
//             { id: "uni-1153", name: "Whykong", bn_name: "হোয়াইকং", upazila_id: "upa-105" }
//           ]
//         },
//         {
//           id: "upa-106",
//           name: "Ukhia",
//           bn_name: "উখিয়া",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1154", name: "Haldia Palong", bn_name: "হালদিয়া পালং", upazila_id: "upa-106" },
//             { id: "uni-1155", name: "Jalia Palong", bn_name: "জালিয়া পালং", upazila_id: "upa-106" },
//             { id: "uni-1156", name: "Raja Palong", bn_name: "রাজা পালং", upazila_id: "upa-106" },
//             { id: "uni-1157", name: "Ratna Palong", bn_name: "রত্ন পালং", upazila_id: "upa-106" },
//             { id: "uni-1158", name: "Ukhia", bn_name: "উখিয়া", upazila_id: "upa-106" }
//           ]
//         },
//         {
//           id: "upa-107",
//           name: "Pekua",
//           bn_name: "পেকুয়া",
//           district_id: "dis-15",
//           unions: [
//             { id: "uni-1159", name: "Baragho", bn_name: "বাড়ঘো", upazila_id: "upa-107" },
//             { id: "uni-1160", name: "Magnama", bn_name: "মগনামা", upazila_id: "upa-107" },
//             { id: "uni-1161", name: "Pekua", bn_name: "পেকুয়া", upazila_id: "upa-107" },
//             { id: "uni-1162", name: "Rajakhali", bn_name: "রাজাখালী", upazila_id: "upa-107" },
//             { id: "uni-1163", name: "Shilkhali", bn_name: "শিলখালী", upazila_id: "upa-107" },
//             { id: "uni-1164", name: "Taitong", bn_name: "তাইতং", upazila_id: "upa-107" }
//           ]
//         }
//       ]
//     },
//     {
//       id: "dis-16",
//       name: "Bandarban",
//       bn_name: "বান্দরবান",
//       division_id: "div-2",
//       upazilas: [
//         {
//           id: "upa-108",
//           name: "Bandarban Sadar",
//           bn_name: "বান্দরবান সদর",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1165", name: "Bandarban", bn_name: "বান্দরবান", upazila_id: "upa-108" },
//             { id: "uni-1166", name: "Kuhalong", bn_name: "কুহালং", upazila_id: "upa-108" },
//             { id: "uni-1167", name: "Rajbila", bn_name: "রাজবিলা", upazila_id: "upa-108" },
//             { id: "uni-1168", name: "Suwalok", bn_name: "সুয়ালক", upazila_id: "upa-108" },
//             { id: "uni-1169", name: "Tongkabati", bn_name: "টংকাবতী", upazila_id: "upa-108" }
//           ]
//         },
//         {
//           id: "upa-109",
//           name: "Alikadam",
//           bn_name: "আলীকদম",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1170", name: "Alikadam", bn_name: "আলীকদম", upazila_id: "upa-109" },
//             { id: "uni-1171", name: "Chokhyong", bn_name: "চক্ষ্যং", upazila_id: "upa-109" },
//                         { id: "uni-1172", name: "Noapatang", bn_name: "নোয়াপাতাং", upazila_id: "upa-109" }
//           ]
//         },
//         {
//           id: "upa-110",
//           name: "Thanchi",
//           bn_name: "থানচি",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1173", name: "Balipara", bn_name: "বালিপাড়া", upazila_id: "upa-110" },
//             { id: "uni-1174", name: "Remakre", bn_name: "রেমাক্রে", upazila_id: "upa-110" },
//             { id: "uni-1175", name: "Thanchi", bn_name: "থানচি", upazila_id: "upa-110" },
//             { id: "uni-1176", name: "Tindu", bn_name: "তিন্দু", upazila_id: "upa-110" }
//           ]
//         },
//         {
//           id: "upa-111",
//           name: "Lama",
//           bn_name: "লামা",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1177", name: "Aziznagar", bn_name: "আজিজনগর", upazila_id: "upa-111" },
//             { id: "uni-1178", name: "Fasiakhali", bn_name: "ফাসিয়াখালী", upazila_id: "upa-111" },
//             { id: "uni-1179", name: "Gajalia", bn_name: "গজালিয়া", upazila_id: "upa-111" },
//             { id: "uni-1180", name: "Lama", bn_name: "লামা", upazila_id: "upa-111" },
//             { id: "uni-1181", name: "Rupashipara", bn_name: "রূপসীপাড়া", upazila_id: "upa-111" },
//             { id: "uni-1182", name: "Sarai", bn_name: "সরাই", upazila_id: "upa-111" }
//           ]
//         },
//         {
//           id: "upa-112",
//           name: "Naikhongchhari",
//           bn_name: "নাইক্ষ্যংছড়ি",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1183", name: "Baishari", bn_name: "বাইশারী", upazila_id: "upa-112" },
//             { id: "uni-1184", name: "Dochhari", bn_name: "দোছড়ি", upazila_id: "upa-112" },
//             { id: "uni-1185", name: "Ghundum", bn_name: "ঘুনডুম", upazila_id: "upa-112" },
//             { id: "uni-1186", name: "Naikhongchhari", bn_name: "নাইক্ষ্যংছড়ি", upazila_id: "upa-112" }
//           ]
//         },
//         {
//           id: "upa-113",
//           name: "Rowangchhari",
//           bn_name: "রোয়াংছড়ি",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1187", name: "Alekyong", bn_name: "আলেক্ষ্যং", upazila_id: "upa-113" },
//             { id: "uni-1188", name: "Nawapotong", bn_name: "নাওয়াপতং", upazila_id: "upa-113" },
//             { id: "uni-1189", name: "Rowangchhari", bn_name: "রোয়াংছড়ি", upazila_id: "upa-113" },
//             { id: "uni-1190", name: "Taracha", bn_name: "তারাছা", upazila_id: "upa-113" }
//           ]
//         },
//         {
//           id: "upa-114",
//           name: "Ruma",
//           bn_name: "রুমা",
//           district_id: "dis-16",
//           unions: [
//             { id: "uni-1191", name: "Galengga", bn_name: "গালেঙ্গগা", upazila_id: "upa-114" },
//             { id: "uni-1192", name: "Paind", bn_name: "পাইন্দ", upazila_id: "upa-114" },
//             { id: "uni-1193", name: "Ruma", bn_name: "রুমা", upazila_id: "upa-114" },
//             { id: "uni-1194", name: "Remakre", bn_name: "রেমাক্রে", upazila_id: "upa-114" }
//           ]
//         }
//       ]
//     },
//     {
//       id: "dis-17",
//       name: "Brahmanbaria",
//       bn_name: "ব্রাহ্মণবাড়িয়া",
//       division_id: "div-2",
//       upazilas: [
//         {
//           id: "upa-115",
//           name: "Brahmanbaria Sadar",
//           bn_name: "ব্রাহ্মণবাড়িয়া সদর",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1195", name: "Brahmanbaria", bn_name: "ব্রাহ্মণবাড়িয়া", upazila_id: "upa-115" },
//             { id: "uni-1196", name: "Chandura", bn_name: "চান্দুরা", upazila_id: "upa-115" },
//             { id: "uni-1197", name: "Chargachh", bn_name: "চরগাছ", upazila_id: "upa-115" },
//             { id: "uni-1198", name: "Gokarna", bn_name: "গোকর্ণ", upazila_id: "upa-115" },
//             { id: "uni-1199", name: "Harashpur", bn_name: "হরষপুর", upazila_id: "upa-115" },
//             { id: "uni-1200", name: "Poun", bn_name: "পৌন", upazila_id: "upa-115" },
//             { id: "uni-1201", name: "Sultanpur", bn_name: "সুলতানপুর", upazila_id: "upa-115" },
//             { id: "uni-1202", name: "Talsahar", bn_name: "তালশহর", upazila_id: "upa-115" }
//           ]
//         },
//         {
//           id: "upa-116",
//           name: "Ashuganj",
//           bn_name: "আশুগঞ্জ",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1203", name: "Ashuganj", bn_name: "আশুগঞ্জ", upazila_id: "upa-116" },
//             { id: "uni-1204", name: "Char Chartala", bn_name: "চরচারতলা", upazila_id: "upa-116" },
//             { id: "uni-1205", name: "Durgapur", bn_name: "দুর্গাপুর", upazila_id: "upa-116" },
//             { id: "uni-1206", name: "Lalpur", bn_name: "লালপুর", upazila_id: "upa-116" },
//             { id: "uni-1207", name: "Noapara", bn_name: "নোয়াপাড়া", upazila_id: "upa-116" },
//             { id: "uni-1208", name: "Sarifpur", bn_name: "শরিফপুর", upazila_id: "upa-116" },
//             { id: "uni-1209", name: "Shahjadapur", bn_name: "শাহজাদাপুর", upazila_id: "upa-116" }
//           ]
//         },
//         {
//           id: "upa-117",
//           name: "Nasirnagar",
//           bn_name: "নাসিরনগর",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1210", name: "Bhomoradona", bn_name: "ভোমরাদোনা", upazila_id: "upa-117" },
//             { id: "uni-1211", name: "Gunabhanga", bn_name: "গুনভাঙ্গা", upazila_id: "upa-117" },
//             { id: "uni-1212", name: "Haripur", bn_name: "হরিপুর", upazila_id: "upa-117" },
//             { id: "uni-1213", name: "Kunda", bn_name: "কুন্ডা", upazila_id: "upa-117" },
//             { id: "uni-1214", name: "Nasirnagar", bn_name: "নাসিরনগর", upazila_id: "upa-117" },
//             { id: "uni-1215", name: "Purbabhag", bn_name: "পূর্বভাগ", upazila_id: "upa-117" },
//             { id: "uni-1216", name: "Shibpur", bn_name: "শিবপুর", upazila_id: "upa-117" }
//           ]
//         },
//         {
//           id: "upa-118",
//           name: "Nabinagar",
//           bn_name: "নবীনগর",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1217", name: "Barail", bn_name: "বরাইল", upazila_id: "upa-118" },
//             { id: "uni-1218", name: "Biddayakut", bn_name: "বিদ্দাকুট", upazila_id: "upa-118" },
//             { id: "uni-1219", name: "Burishwar", bn_name: "বুড়িশ্বর", upazila_id: "upa-118" },
//             { id: "uni-1220", name: "Ibrahimpur", bn_name: "ইব্রাহিমপুর", upazila_id: "upa-118" },
//             { id: "uni-1221", name: "Laubfatehpur", bn_name: "লাউতফতেপুর", upazila_id: "upa-118" },
//             { id: "uni-1222", name: "Nabinagar", bn_name: "নবীনগর", upazila_id: "upa-118" },
//             { id: "uni-1223", name: "Rasullabad", bn_name: "রসুলাবাদ", upazila_id: "upa-118" },
//             { id: "uni-1224", name: "Ratanpur", bn_name: "রতনপুর", upazila_id: "upa-118" },
//             { id: "uni-1225", name: "Shamogram", bn_name: "শামগ্রাম", upazila_id: "upa-118" },
//             { id: "uni-1226", name: "Sreepur", bn_name: "শ্রীপুর", upazila_id: "upa-118" }
//           ]
//         },
//         {
//           id: "upa-119",
//           name: "Sarail",
//           bn_name: "সরাইল",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1227", name: "Aorab", bn_name: "আওরাব", upazila_id: "upa-119" },
//             { id: "uni-1228", name: "Chunta", bn_name: "চুন্টা", upazila_id: "upa-119" },
//             { id: "uni-1229", name: "Kalikaccha", bn_name: "কালিকচ্ছ", upazila_id: "upa-119" },
//             { id: "uni-1230", name: "Noagoun", bn_name: "নোয়াগাঁও", upazila_id: "upa-119" },
//             { id: "uni-1231", name: "Pakshimu", bn_name: "পক্ষীমু", upazila_id: "upa-119" },
//             { id: "uni-1232", name: "Sarail", bn_name: "সরাইল", upazila_id: "upa-119" },
//             { id: "uni-1233", name: "Shahbajpur", bn_name: "শাহবাজপুর", upazila_id: "upa-119" },
//             { id: "uni-1234", name: "Shahjadapur", bn_name: "শাহজাদাপুর", upazila_id: "upa-119" }
//           ]
//         },
//         {
//           id: "upa-120",
//           name: "Bancharampur",
//           bn_name: "বাঞ্ছারামপুর",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1235", name: "Arail", bn_name: "আড়াইল", upazila_id: "upa-120" },
//             { id: "uni-1236", name: "Bancharampur", bn_name: "বাঞ্ছারামপুর", upazila_id: "upa-120" },
//             { id: "uni-1237", name: "Bhadughar", bn_name: "ভাদুঘর", upazila_id: "upa-120" },
//             { id: "uni-1238", name: "Salimabad", bn_name: "সালিমাবাদ", upazila_id: "upa-120" },
//             { id: "uni-1239", name: "Sreenagar", bn_name: "শ্রীনগর", upazila_id: "upa-120" },
//             { id: "uni-1240", name: "Suatali", bn_name: "সুয়াতলী", upazila_id: "upa-120" },
//             { id: "uni-1241", name: "Ujanchar", bn_name: "উজানচর", upazila_id: "upa-120" }
//           ]
//         },
//         {
//           id: "upa-121",
//           name: "Bijoynagar",
//           bn_name: "বিজয়নগর",
//           district_id: "dis-17",
//           unions: [
//             { id: "uni-1242", name: "Bishupur", bn_name: "বিষ্ণুপুর", upazila_id: "upa-121" },
//             { id: "uni-1243", name: "Budhanti", bn_name: "বুধন্তি", upazila_id: "upa-121" },
//             { id: "uni-1244", name: "Champaknagar", bn_name: "চম্পকনগর", upazila_id: "upa-121" },
//             { id: "uni-1245", name: "Chandura", bn_name: "চান্দুরা", upazila_id: "upa-121" },
//             { id: "uni-1246", name: "Char Islampur", bn_name: "চরইসলামপুর", upazila_id: "upa-121" },
//             { id: "uni-1247", name: "Dakshin Natai", bn_name: "দক্ষিণ নাটাই", upazila_id: "upa-121" },
//             { id: "uni-1248", name: "Dariabad", bn_name: "দরিয়াবাদ", upazila_id: "upa-121" },
//             { id: "uni-1249", name: "Gopinathpur", bn_name: "গোপীনাথপুর", upazila_id: "upa-121" },
//             { id: "uni-1250", name: "Pattan", bn_name: "পট্টন", upazila_id: "upa-121" },
//             { id: "uni-1251", name: "Pirijpur", bn_name: "পিরিজপুর", upazila_id: "upa-121" },
//             { id: "uni-1252", name: "Sadekpur", bn_name: "সাদেকপুর", upazila_id: "upa-121" }
//           ]
//         }
//       ]
//     },
//     {
//       id: "dis-18",
//       name: "Chandpur",
//       bn_name: "চাঁদপুর",
//       division_id: "div-2",
//       upazilas: [
//         {
//           id: "upa-122",
//           name: "Chandpur Sadar",
//           bn_name: "চাঁদপুর সদর",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1253", name: "Ashrafpur", bn_name: "আশ্রাফপুর", upazila_id: "upa-122" },
//             { id: "uni-1254", name: "Baghadi", bn_name: "বাঘাদি", upazila_id: "upa-122" },
//             { id: "uni-1255", name: "Balia", bn_name: "বালিয়া", upazila_id: "upa-122" },
//             { id: "uni-1256", name: "Bishnupur", bn_name: "বিষ্ণুপুর", upazila_id: "upa-122" },
//             { id: "uni-1257", name: "Chandpur", bn_name: "চাঁদপুর", upazila_id: "upa-122" },
//             { id: "uni-1258", name: "Hanar Char", bn_name: "হানারচর", upazila_id: "upa-122" },
//             { id: "uni-1259", name: "Ibrahimpur", bn_name: "ইব্রাহিমপুর", upazila_id: "upa-122" },
//             { id: "uni-1260", name: "Kalocho", bn_name: "কালোচো", upazila_id: "upa-122" },
//             { id: "uni-1261", name: "Maishadi", bn_name: "মাইশাদী", upazila_id: "upa-122" },
//             { id: "uni-1262", name: "Rajrajeshwar", bn_name: "রাজরাজেশ্বর", upazila_id: "upa-122" },
//             { id: "uni-1263", name: "Rampur", bn_name: "রামপুর", upazila_id: "upa-122" },
//             { id: "uni-1264", name: "Shah Mahmudpur", bn_name: "শাহমাহমুদপুর", upazila_id: "upa-122" }
//           ]
//         },
//         {
//           id: "upa-123",
//           name: "Faridganj",
//           bn_name: "ফরিদগঞ্জ",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1265", name: "Durgapur", bn_name: "দুর্গাপুর", upazila_id: "upa-123" },
//             { id: "uni-1266", name: "Faridganj", bn_name: "ফরিদগঞ্জ", upazila_id: "upa-123" },
//                         { id: "uni-1267", name: "Gridkalinagar", bn_name: "গ্রিডকালীনগর", upazila_id: "upa-123" },
//             { id: "uni-1268", name: "Islampur", bn_name: "ইসলামপুর", upazila_id: "upa-123" },
//             { id: "uni-1269", name: "Rampur", bn_name: "রামপুর", upazila_id: "upa-123" },
//             { id: "uni-1270", name: "Ramnarayanpur", bn_name: "রামনারায়ণপুর", upazila_id: "upa-123" },
//             { id: "uni-1271", name: "Rupshi", bn_name: "রূপশী", upazila_id: "upa-123" },
//             { id: "uni-1272", name: "Sultanpur", bn_name: "সুলতানপুর", upazila_id: "upa-123" }
//           ]
//         },
//         {
//           id: "upa-124",
//           name: "Haimchar",
//           bn_name: "হাইমচর",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1273", name: "Charbhairabi", bn_name: "চরভৈরবী", upazila_id: "upa-124" },
//             { id: "uni-1274", name: "Haimchar", bn_name: "হাইমচর", upazila_id: "upa-124" },
//             { id: "uni-1275", name: "Gazirchar", bn_name: "গাজীরচর", upazila_id: "upa-124" },
//             { id: "uni-1276", name: "Nilkamal", bn_name: "নীলকমল", upazila_id: "upa-124" }
//           ]
//         },
//         {
//           id: "upa-125",
//           name: "Hajiganj",
//           bn_name: "হাজীগঞ্জ",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1277", name: "Bakila", bn_name: "বাকিলা", upazila_id: "upa-125" },
//             { id: "uni-1278", name: "Batuya", bn_name: "বাটুয়া", upazila_id: "upa-125" },
//             { id: "uni-1279", name: "Hajiganj", bn_name: "হাজীগঞ্জ", upazila_id: "upa-125" },
//             { id: "uni-1280", name: "Hamsadi", bn_name: "হামসাদী", upazila_id: "upa-125" },
//             { id: "uni-1281", name: "Hatila", bn_name: "হাটিলা", upazila_id: "upa-125" },
//             { id: "uni-1282", name: "Kachua", bn_name: "কচুয়া", upazila_id: "upa-125" },
//             { id: "uni-1283", name: "Kalocho", bn_name: "কালোচো", upazila_id: "upa-125" },
//             { id: "uni-1284", name: "Rajargaon", bn_name: "রাজারগাঁও", upazila_id: "upa-125" }
//           ]
//         },
//         {
//           id: "upa-126",
//           name: "Kachua",
//           bn_name: "কচুয়া",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1285", name: "Ashrafpur", bn_name: "আশ্রাফপুর", upazila_id: "upa-126" },
//             { id: "uni-1286", name: "Kachua", bn_name: "কচুয়া", upazila_id: "upa-126" },
//             { id: "uni-1287", name: "Kadla", bn_name: "কাদলা", upazila_id: "upa-126" },
//             { id: "uni-1288", name: "Karaia", bn_name: "কারাইয়া", upazila_id: "upa-126" },
//             { id: "uni-1289", name: "Mohanpur", bn_name: "মোহনপুর", upazila_id: "upa-126" },
//             { id: "uni-1290", name: "Rampur", bn_name: "রামপুর", upazila_id: "upa-126" },
//             { id: "uni-1291", name: "Sachar", bn_name: "সাচার", upazila_id: "upa-126" },
//             { id: "uni-1292", name: "Shahapur", bn_name: "শাহাপুর", upazila_id: "upa-126" }
//           ]
//         },
//         {
//           id: "upa-127",
//           name: "Matlab Dakshin",
//           bn_name: "মতলব দক্ষিণ",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1293", name: "Durgapur", bn_name: "দুর্গাপур", upazila_id: "upa-127" },
//             { id: "uni-1294", name: "Elahabad", bn_name: "এলাহাবাদ", upazila_id: "upa-127" },
//             { id: "uni-1295", name: "Khadergaon", bn_name: "খাদেরগাঁও", upazila_id: "upa-127" },
//             { id: "uni-1296", name: "Matlab", bn_name: "মতলব", upazila_id: "upa-127" },
//             { id: "uni-1297", name: "Nayergaon", bn_name: "নায়েরগাঁও", upazila_id: "upa-127" },
//             { id: "uni-1298", name: "Sultanpur", bn_name: "সুলতানপুর", upazila_id: "upa-127" }
//           ]
//         },
//         {
//           id: "upa-128",
//           name: "Matlab Uttar",
//           bn_name: "মতলব উত্তর",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1299", name: "Amanullapur", bn_name: "আমানুল্লাপুর", upazila_id: "upa-128" },
//             { id: "uni-1300", name: "Islampur", bn_name: "ইসলামপুর", upazila_id: "upa-128" },
//             { id: "uni-1301", name: "Kherihar Algi", bn_name: "খেরিহার আলগী", upazila_id: "upa-128" },
//             { id: "uni-1302", name: "Matlab", bn_name: "মতলব", upazila_id: "upa-128" },
//             { id: "uni-1303", name: "Nayergaon", bn_name: "নায়েরগাঁও", upazila_id: "upa-128" },
//             { id: "uni-1304", name: "Purba Narayanpur", bn_name: "পুর্ব নারায়ণপুর", upazila_id: "upa-128" }
//           ]
//         },
//         {
//           id: "upa-129",
//           name: "Shahrasti",
//           bn_name: "শাহরাস্তি",
//           district_id: "dis-18",
//           unions: [
//             { id: "uni-1305", name: "Chitoshi", bn_name: "চিতোষী", upazila_id: "upa-129" },
//             { id: "uni-1306", name: "Durgapur", bn_name: "দুর্গাপুর", upazila_id: "upa-129" },
//             { id: "uni-1307", name: "Islamia", bn_name: "ইসলামিয়া", upazila_id: "upa-129" },
//             { id: "uni-1308", name: "Khaser Hat", bn_name: "খাসেরহাট", upazila_id: "upa-129" },
//             { id: "uni-1309", name: "Mohanpur", bn_name: "মোহনপুর", upazila_id: "upa-129" },
//             { id: "uni-1310", name: "Pashchim Kherihar Algi", bn_name: "পশ্চিম খেরিহার আলগী", upazila_id: "upa-129" },
//             { id: "uni-1311", name: "Rampur", bn_name: "রামপুর", upazila_id: "upa-129" },
//             { id: "uni-1312", name: "Shahrasti", bn_name: "শাহরাস্তি", upazila_id: "upa-129" },
//             { id: "uni-1313", name: "Sultanpur", bn_name: "সুলতানপুর", upazila_id: "upa-129" }
//           ]
//         }
//       ]
//     }
//   ]
// }