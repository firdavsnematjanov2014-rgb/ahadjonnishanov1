import { GradeLevel, LessonTopic, LearningResource, HomeworkTask, StudentRecord, LeaderboardUser } from '../types';

export const GRADE_INFO: Record<GradeLevel, { title: string; desc: string; icon: string; color: string; topicsCount: number }> = {
  5: {
    title: "5-sinf: Axborot olami va kompyuter savodxonligi",
    desc: "Axborot tushunchasi, kompyuter qurilmalari, Paint va fayllar bilan ishlash.",
    icon: "Monitor",
    color: "from-blue-500 to-cyan-500",
    topicsCount: 4,
  },
  6: {
    title: "6-sinf: Matn muharriri va Scratch vizual dasturlash",
    desc: "MS Word da matn terish, tahrirlash, Scratch da spritelar va animatsiyalar.",
    icon: "Code2",
    color: "from-emerald-500 to-teal-500",
    topicsCount: 4,
  },
  7: {
    title: "7-sinf: Elektron jadvallar va Algoritmlar asoslari",
    desc: "MS Excel formulalari, diagrammalar, algoritm turlari va blok-sxemalar.",
    icon: "Table",
    color: "from-amber-500 to-orange-500",
    topicsCount: 4,
  },
  8: {
    title: "8-sinf: Python dasturlash tiliga chuqur kirish",
    desc: "Sintaksis, o'zgaruvchilar, if-else shartlari, for va while sikllari.",
    icon: "Terminal",
    color: "from-indigo-500 to-purple-500",
    topicsCount: 4,
  },
  9: {
    title: "9-sinf: Ro'yxatlar, Funksiyalar va Web texnologiyalar",
    desc: "Python ro'yxatlari, def funksiyalari, HTML & CSS teglari, axborot xavfsizligi.",
    icon: "Globe",
    color: "from-violet-500 to-pink-500",
    topicsCount: 4,
  },
  10: {
    title: "10-sinf: Ma'lumotlar bazasi, SQL va JavaScript",
    desc: "Relyatsion ma'lumotlar bazalari, SQL so'rovlari, JS skriptlari, kiberxavfsizlik.",
    icon: "Database",
    color: "from-rose-500 to-red-500",
    topicsCount: 4,
  },
  11: {
    title: "11-sinf: Sun'iy intellekt, Data Science va IT loyihalar",
    desc: "Machine Learning asoslari, neyron tarmoqlar, startaplar va kasbga yo'naltirish.",
    icon: "Cpu",
    color: "from-sky-500 to-indigo-600",
    topicsCount: 4,
  },
};

export const LESSONS_DATA: LessonTopic[] = [
  // 5-sinf
  {
    id: "lesson-5-1",
    grade: 5,
    chapterNumber: 1,
    title: "Axborot va uning xillari. Inson va axborot",
    subtitle: "Atrofdagi axborotlar, sezgi a'zolari va axborot jarayonlari",
    durationMinutes: 45,
    overview: "Ushbu darsda axborot nima ekanligi, inson axborotni qanday qabul qilishi (ko'rish, eshitish, hid bilish, ta'm bilish, sezish) hamda axborot ustida bajariladigan jarayonlar (qabul qilish, saqlash, uzatish, qayta ishlash) o'rganiladi.",
    sections: [
      {
        title: "1. Axborot tushunchasi",
        content: "Axborot — bu atrof-muhit, voqea-hodisalar, predmetlar haqidagi ma'lumot, bilim va xabarlardir. 'Axborot' so'zi arabcha 'xabar' so'zidan kelib chiqqan. Inson kun davomida kitob o'qish, televizor ko'rish, do'stlari bilan suhbatlashish orqali uzluksiz axborot oladi.",
        note: "Inson axborotning 80-85 foizini ko'rish a'zosi (ko'z) orqali oladi!",
      },
      {
        title: "2. Axborot jarayonlari",
        content: "Axborot ustida to'rtta asosiy jarayon amalga oshiriladi:\n1. Axborotni qidirish va to'plash\n2. Axborotni saqlash (qog'ozda, xotirada, fleshkada)\n3. Axborotni uzatish (manbadan qabul qiluvchiga aloqa kanali orqali)\n4. Axborotni qayta ishlash (masala yechish, tarjima qilish, tartibga solish)",
      },
      {
        title: "3. Zamonaviy kompyuter va axborot",
        content: "Kompyuter — insonning axborot bilan ishlashdagi eng asosiy universal yordamchisidir. U matn, rasm, ovoz va videoni elektr signallari (0 va 1 raqamlari) ko'rinishida qayta ishlaydi.",
      }
    ],
    keyTerms: ["Axborot", "Sezgi a'zolari", "Axborot jarayonlari", "Xotira", "Kompyuter"],
    practicalTask: {
      title: "Amaliy topshiriq: Axborot turlarini aniqlash",
      description: "Daftaringizga yoki matn maydoniga 5 ta turli xil axborot (masalan: ko'rish orqali olingan, eshitish orqali olingan) misolini yozing va qaysi jarayonga tegishli ekanini ko'rsating.",
      sampleSolution: "1. Chiroqning yashil chirog'i yondi — Ko'rish axboroti (uzatish va qabul qilish).\n2. Qo'ng'iroq chalindi — Tovush axboroti."
    },
    videoTutorial: {
      title: "5-sinf Informatika: Axborot va uning xossalari",
      duration: "12:40",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      isLocalOrSample: true,
    },
    quiz: [
      {
        id: "q-5-1-1",
        question: "Inson tashqi olamdagi axborotlarning ko'p qismini qaysi sezgi a'zosi orqali qabul qiladi?",
        options: ["Eshitish a'zosi (quloq)", "Ko'rish a'zosi (ko'z)", "Hid bilish a'zosi (burun)", "Sezish a'zosi (teri)"],
        correctIndex: 1,
        explanation: "Inson axborotning 80-85% ini ko'rish a'zolari (ko'z) orqali idrok etadi.",
        points: 10,
      },
      {
        id: "q-5-1-2",
        question: "Quyidagilardan qaysi biri axborot jarayonlariga kirmaydi?",
        options: ["Axborotni saqlash", "Axborotni qayta ishlash", "Axborotni iste'mol qilish", "Axborotni uzatish"],
        correctIndex: 2,
        explanation: "Axborot jarayonlariga saqlash, uzatish, qabul qilish va qayta ishlash kiradi.",
        points: 10,
      },
      {
        id: "q-5-1-3",
        question: "Kompyuter axborotni qanday belgilarda qayta ishlaydi?",
        options: ["Faqat lotin harflarida", "0 va 1 ikkilik sanoq kodlarida", "Rangli piksellar orqali", "Ovoz to'lqinlarida"],
        correctIndex: 1,
        explanation: "Zamonaviy raqamli kompyuterlar barcha ma'lumotlarni 0 va 1 (ikkilik kod) orqali ifodalaydi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-5-2",
    grade: 5,
    chapterNumber: 2,
    title: "Kompyuterning asosiy va qo'shimcha qurilmalari",
    subtitle: "Tizim bloki, monitor, klaviatura, sichqoncha va tashqi qurilmalar",
    durationMinutes: 45,
    overview: "Kompyuter arxitekturasi bilan tanishish: axborot kirituvchi (klaviatura, sichqoncha, mikrofon, skaner) va chiqaruvchi (monitor, printer, kolonka) qurilmalar.",
    sections: [
      {
        title: "1. Asosiy qurilmalar",
        content: "Shaxsiy kompyuter to'rtta asosiy qismdan tashkil topadi:\n- Tizim bloki (ichida protsessor, operativ xotira, qattiq disk joylashgan)\n- Monitor (ekranda axborotni ko'rsatish)\n- Klaviatura (matn va buyruqlarni kiritish)\n- Sichqoncha (ko'rsatkichni boshqarish)",
      },
      {
        title: "2. Kiritish va chiqarish qurilmalari",
        content: "Kiritish qurilmalari: klaviatura, sichqoncha, skaner, veb-kamera, mikrofon.\nChiqarish qurilmalari: monitor, printer (chop etish), naushnik, kolonka (ovoz chiqarish).",
      }
    ],
    keyTerms: ["Tizim bloki", "Protsessor", "Monitor", "Printer", "Klaviatura", "Skaner"],
    practicalTask: {
      title: "Qurilmalarni guruhlarga ajratish",
      description: "Quyidagi qurilmalarni kiritish va chiqarish guruhlariga ajrating: Mikrofon, Printer, Sichqoncha, Monitor, Skaner, Kolonka.",
      sampleSolution: "Kiritish: Mikrofon, Sichqoncha, Skaner.\nChiqarish: Printer, Monitor, Kolonka."
    },
    quiz: [
      {
        id: "q-5-2-1",
        question: "Kompyuterning 'miyasi' deb qaysi qurilma ataladi?",
        options: ["Qattiq disk (HDD/SSD)", "Markaziy protsessor (CPU)", "Operativ xotira (RAM)", "Videokarta"],
        correctIndex: 1,
        explanation: "Markaziy protsessor (CPU) barcha hisob-kitoblarni amalga oshiruvchi asosiy hisoblash qismidir.",
        points: 10,
      },
      {
        id: "q-5-2-2",
        question: "Quyidagilardan qaysi biri axborotni kiritish qurilmasi hisoblanadi?",
        options: ["Printer", "Monitor", "Mikrofon", "Karnay (kolonka)"],
        correctIndex: 2,
        explanation: "Mikrofon tovush axborotini kompyuterga kiritish qurilmasi hisoblanadi.",
        points: 10,
      }
    ]
  },

  // 6-sinf
  {
    id: "lesson-6-1",
    grade: 6,
    chapterNumber: 1,
    title: "Matn muharrirlari va MS Word da formatlash",
    subtitle: "Hujjatlar yaratish, shriftlar, shrift o'lchami, abzas va jadvallar",
    durationMinutes: 45,
    overview: "Ushbu bo'limda matnli axborotlarni kompyuterda yaratish, tahrirlash (kesish, nusxalash, qo'yish), abzas va sahifa parametrlarini to'g'irlash o'rganiladi.",
    sections: [
      {
        title: "1. Matn muharriri nima?",
        content: "Matn muharriri — matnli hujjatlarni yaratish, tahrirlash, bezash va chop etish uchun mo'ljallangan amaliy dastur. Eng mashhur dasturlar: Bloknot, WordPad va Microsoft Word.",
      },
      {
        title: "2. Tezkor tugmalar (Hotkeys)",
        content: "- Ctrl + C : Nusxa olish (Copy)\n- Ctrl + V : Qo'yish (Paste)\n- Ctrl + X : Qirqib olish (Cut)\n- Ctrl + Z : Bekor qilish (Undo)\n- Ctrl + S : Hujjatni saqlash (Save)",
        note: "Tezkor tugmalardan foydalanish ish tezligingizni 3 barobarga oshiradi!",
      }
    ],
    keyTerms: ["MS Word", "Shrift (Font)", "Abzas", "Ctrl+C / Ctrl+V", "Kursor"],
    practicalTask: {
      title: "MS Word da chiroyli rezyume yoki matn terish",
      description: "MS Word yoki matn muharririda o'zingiz haqingizda 5 qatordan iborat matn yozing va sarlavhasini qalin (Bold) va 16 pt qilib belgilang.",
    },
    quiz: [
      {
        id: "q-6-1-1",
        question: "Matndan nusxa olish uchun qaysi tezkor klavishlar birikmasi bosiladi?",
        options: ["Ctrl + V", "Ctrl + C", "Ctrl + Z", "Ctrl + P"],
        correctIndex: 1,
        explanation: "Ctrl + C matn yoki fayldan xotiraga nusxa (Copy) oladi.",
        points: 10,
      },
      {
        id: "q-6-1-2",
        question: "MS Word da matnni qalin qilish uchun qaysi belgi ishlatiladi?",
        options: ["I (Italic)", "U (Underline)", "B (Bold)", "S (Strikethrough)"],
        correctIndex: 2,
        explanation: "B (Bold) tugmasi shriftni qalinlashtiradi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-6-2",
    grade: 6,
    chapterNumber: 2,
    title: "Scratch vizual dasturlash muhiti bilan tanishuv",
    subtitle: "Spritelar, koordinatalar tekisligi, animatsiya va rangli bloklar",
    durationMinutes: 45,
    overview: "Scratch — bolalar va yangi boshlovchilar uchun bloklar yordamida interaktiv o'yinlar, multfilmlar va hikoyalar yaratish imkonini beruvchi dastur.",
    sections: [
      {
        title: "1. Scratch interfeysi",
        content: "Scratch ekranida 3 asosiy qism bor: Bloklar palitrasi (Harakat, Ko'rinish, Ovoz, Hodisalar, Boshqaruv), Skript maydoni (bloklar teriladigan joy) va Sahna (natijani ko'rsatadigan maydon).",
      },
      {
        title: "2. Mushukcha spriti bilan birinchi animatsiya",
        content: "Mushukchani harakatlantirish uchun 'Yashil bayroqcha bosilganda' blokini olib, tagiga '10 qadam yuring' va 'Agar chetga tegsa, qayting' blokini ulaymiz.",
      }
    ],
    keyTerms: ["Scratch", "Sprit (Sprite)", "Kostyum", "Yashil bayroqcha", "Skript"],
    practicalTask: {
      title: "Scratch da yuguruvchi qahramon",
      description: "Scratch dasturida yangi sprit tanlang va uni klaviaturadagi o'q tugmalari orqali boshqariladigan qiling.",
    },
    quiz: [
      {
        id: "q-6-2-1",
        question: "Scratch dasturida dasturni ishga tushirish uchun qaysi belgi bosiladi?",
        options: ["Qizil doiracha", "Yashil bayroqcha", "Sariq uchburchak", "Ko'k yulduzcha"],
        correctIndex: 1,
        explanation: "Scratch dasturida Yashil bayroqcha (Green Flag) skriptlarni boshlaydi.",
        points: 10,
      }
    ]
  },

  // 7-sinf
  {
    id: "lesson-7-1",
    grade: 7,
    chapterNumber: 1,
    title: "MS Excel elektron jadvallari va formulalar",
    subtitle: "Katakchalar (A1, B2), arifmetik formulalar, SUM, AVERAGE funksiyalari",
    durationMinutes: 45,
    overview: "Elektron jadvallar ma'lumotlarni tartibga solish, hisob-kitob qilish va diagrammalar tuzishda ishlatiladi. Har bir katakcha ustun va qator kesishmasidan hosil bo'ladi.",
    sections: [
      {
        title: "1. Formula yozish qoidasi",
        content: "MS Excel dasturida har qanday formula har doim '=' (tenglik) belgisi bilan boshlanadi!\nMisollar: =A1+B1, =C2*10, =SUM(A1:A10), =AVERAGE(B1:B5)",
      },
      {
        title: "2. Asosiy statistik funksiyalar",
        content: "- SUM (YIG'INDI): Tanlangan kataklar yig'indisini hisoblaydi.\n- AVERAGE (O'RTACHA): O'rtacha arifmetik qiymatni topadi.\n- MAX / MIN: Eng katta va eng kichik sonni aniqlaydi.",
      }
    ],
    keyTerms: ["Katakcha (Cell)", "Formula", "=SUM()", "=AVERAGE()", "Diagramma"],
    practicalTask: {
      title: "O'quvchilar baholari jadvalini hisoblash",
      description: "Excel da 5 ta o'quvchining 3 ta fandan olgan ballarini kiritib, har birining o'rtacha ballini =AVERAGE formula orqali hisoblang.",
    },
    quiz: [
      {
        id: "q-7-1-1",
        question: "MS Excel da barcha formulalar qaysi belgi bilan boshlanishi shart?",
        options: ["+", "#", "=", "$"],
        correctIndex: 2,
        explanation: "Excel da formulalar qat'iy ravishda '=' belgisi bilan boshlanadi.",
        points: 10,
      },
      {
        id: "q-7-1-2",
        question: "=SUM(A1:A5) formulasi nima ish bajaradi?",
        options: ["A1 dan A5 gacha katakchalarni ko'paytiradi", "A1 dan A5 gacha katakchalar yig'indisini hisoblaydi", "A1 va A5 ning o'rtachasini topadi", "A1 va A5 ni solishtiradi"],
        correctIndex: 1,
        explanation: "SUM funksiyasi belgilangan oraliqdagi barcha katakchalar yig'indisini topadi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-7-2",
    grade: 7,
    chapterNumber: 2,
    title: "Algoritmlar tushunchasi va ularning turlari",
    subtitle: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar, blok-sxemalar",
    durationMinutes: 45,
    overview: "Algoritm — qo'yilgan maqsadga erishish yoki masalani yechish uchun bajarilishi kerak bo'lgan aniq va tartibli ko'rsatmalar ketma-ketligi.",
    sections: [
      {
        title: "1. Algoritm xossalari",
        content: "1. Diskretlik (alohida qadamlardan iboratlik)\n2. Tushunarlilik (ijrochiga tushunarli bo'lishi)\n3. Aniqlik (hech qanday noaniqlik bo'lmasligi)\n4. Ommaviylik (bir turdagi barcha masalalar uchun yaroqlilik)\n5. Natijaviylik (chekli qadamda natijaga olib kelishi)",
      },
      {
        title: "2. Algoritm turlari",
        content: "- Chiziqli: Harakatlar ketma-ket, birin-ketin bajariladi.\n- Tarmoqlanuvchi: Ma'lum bir shartga qarab harakat yo'nalishi o'zgaradi (Agar ... u holda ... aks holda).\n- Takrorlanuvchi (Siklik): Bir xil harakat bir necha bor takrorlanadi.",
      }
    ],
    keyTerms: ["Algoritm", "Blok-sxema", "Chiziqli", "Tarmoqlanuvchi", "Takrorlanuvchi (Sikl)", "Ijrochi"],
    practicalTask: {
      title: "Choy damlash algoritmining blok-sxemasi",
      description: "Choy damlash jarayonini qadam-baqadam yozing va shart blokidan foydalaning: Agar suv qaynamagan bo'lsa — kutish.",
    },
    quiz: [
      {
        id: "q-7-2-1",
        question: "Blok-sxemada shartni tekshirish qaysi geometrik shakl orqali ifodalanadi?",
        options: ["To'g'ri to'rtburchak", "Romb", "Ellips (oval)", "Parallelogramm"],
        correctIndex: 1,
        explanation: "Romb shakli shartli tekshirish (ha/yo'q) amallarini bildiradi.",
        points: 10,
      }
    ]
  },

  // 8-sinf
  {
    id: "lesson-8-1",
    grade: 8,
    chapterNumber: 1,
    title: "Python dasturlash tiliga kirish va sintaksis",
    subtitle: "O'zgaruvchilar, print(), input(), ma'lumot turlari (int, float, str, bool)",
    durationMinutes: 45,
    overview: "Python — dunyodagi eng ommabop, o'rganishga oson va kuchli dasturlash tillaridan biri. Unda veb-saytlar, o'yinlar, sun'iy intellekt va ilmiy hisob-kitoblar yaratiladi.",
    sections: [
      {
        title: "1. Birinchi dastur: 'Salom, Dunyo!'",
        content: "Python da matnni ekranga chiqarish juda sodda:",
        codeExample: `# Birinchi dastur
print("Salom, Axadboy Nishanov informatika darsiga xush kelibsiz!")

ism = input("Ismingizni kiriting: ")
print("Salom, " + ism + "!")`,
        codeLanguage: "python",
      },
      {
        title: "2. Ma'lumotlar turlari",
        content: "- int : Butun sonlar (masalan: 15, -4, 0)\n- float : O'nlik kasr sonlar (masalan: 3.14, 2.5)\n- str : Qator yoki matn ('Salom', \"Informatika\")\n- bool : Mantiqiy qiymat (True yoki False)",
        codeExample: `yosh = 14          # int
baho = 4.8         # float
fan = "Python"     # str
alo_uquvchi = True # bool`,
        codeLanguage: "python",
      }
    ],
    keyTerms: ["Python", "print()", "input()", "int", "float", "str", "bool", "O'zgaruvchi"],
    practicalTask: {
      title: "Kvadrat perimetri va yuzini hisoblovchi dastur",
      description: "Foydalanuvchidan kvadratning a tomonini so'rab, uning yuzi (S=a*a) va perimetrini (P=4*a) ekranga chiqaruvchi Python kodini yozing.",
      sampleSolution: `a = float(input("Kvadrat tomonini kiriting: "))
P = 4 * a
S = a * a
print("Perimetri:", P)
print("Yuzi:", S)`
    },
    quiz: [
      {
        id: "q-8-1-1",
        question: "Python da foydalanuvchidan ma'lumot kiritishni so'rash uchun qaysi funksiya ishlatiladi?",
        options: ["print()", "input()", "read()", "scan()"],
        correctIndex: 1,
        explanation: "input() funksiyasi klaviaturadan foydalanuvchi kiritgan qatorni o'qiydi.",
        points: 10,
      },
      {
        id: "q-8-1-2",
        question: "Python da '5' + '5' amali qanday natija beradi?",
        options: ["10", "'55'", "Xatolik (Error)", "0"],
        correctIndex: 1,
        explanation: "Ikkita qator (str) qo'shilganda konkatenatsiya sodir bo'ladi va '55' hosil bo'ladi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-8-2",
    grade: 8,
    chapterNumber: 2,
    title: "Shart operatorlari va Sikllar (if, elif, else, for, while)",
    subtitle: "Mantiqiy shartlar, taqqoslash amallari va takrorlanishlar",
    durationMinutes: 45,
    overview: "Dasturning turli vaziyatlarda turlicha ishlashini ta'minlovchi tarmoqlanish va sikl tuzilmalari bilan ishlash.",
    sections: [
      {
        title: "1. If-Elif-Else strukturasi",
        content: "Shart operatori:",
        codeExample: `ball = int(input("Imtihon balingizni kiriting (0-100): "))

if ball >= 86:
    print("Baho: 5 (A'lo!)")
elif ball >= 71:
    print("Baho: 4 (Yaxshi)")
elif ball >= 56:
    print("Baho: 3 (Qoniqarli)")
else:
    print("Baho: 2 (Yiqildi, ko'proq o'qing!)")`,
        codeLanguage: "python",
      },
      {
        title: "2. For sikli va range() funksiyasi",
        content: "1 dan 10 gacha bo'lgan sonlarni chiqarish:",
        codeExample: `for son in range(1, 11):
    print("Qadam:", son)`,
        codeLanguage: "python",
      }
    ],
    keyTerms: ["if", "elif", "else", "for", "while", "range()", "Indentatsiya (bo'sh joy)"],
    practicalTask: {
      title: "Juft sonlarni topuvchi dastur",
      description: "1 dan 20 gacha bo'lgan sonlar ichidan faqat juft sonlarni ekranga chiqaruvchi for siklini tuzing.",
      sampleSolution: `for i in range(1, 21):
    if i % 2 == 0:
        print(i, "juft son")`
    },
    quiz: [
      {
        id: "q-8-2-1",
        question: "Python da kod bloklari qanday ajratiladi?",
        options: ["Katta qavslar { } bilan", "Bo'shliqlar (indentation / 4 ta probel) orqali", "Nuqtali vergul ; bilan", "BEGIN va END so'zlari bilan"],
        correctIndex: 1,
        explanation: "Python tilida bloklar boshqa tillardagi { } o'rniga surilish (indentation) orqali belgilanadi.",
        points: 10,
      }
    ]
  },

  // 9-sinf
  {
    id: "lesson-9-1",
    grade: 9,
    chapterNumber: 1,
    title: "Python da ro'yxatlar (Lists) va Funksiyalar (def)",
    subtitle: "Ro'yxat metodlari (append, pop, sort), o'z funksiyamizni yaratish",
    durationMinutes: 45,
    overview: "Katta hajmdagi ma'lumotlar to'plamini saqlash uchun ro'yxatlar, kodni qayta ishlatish va tartibli qilish uchun def funksiyalari o'rganiladi.",
    sections: [
      {
        title: "1. Ro'yxatlar (Lists)",
        content: "Ro'yxat — bir nechta elementlarni bitta o'zgaruvchida saqlovchi tartiblangan to'plam.",
        codeExample: `fanlar = ["Informatika", "Matematika", "Fizika", "Ingliz tili"]
print(fanlar[0]) # "Informatika"

fanlar.append("Dasturlash")
print("Elementlar soni:", len(fanlar))`,
        codeLanguage: "python",
      },
      {
        title: "2. Funksiyalar yaratish (def)",
        content: "Kod qismini bitta nom ostida birlashtirish:",
        codeExample: `def kvadratini_top(son):
    return son ** 2

natija = kvadratini_top(7)
print("7 ning kvadrati:", natija) # 49`,
        codeLanguage: "python",
      }
    ],
    keyTerms: ["List", "append()", "pop()", "len()", "def", "return", "Indeks"],
    practicalTask: {
      title: "O'quvchilar ro'yxatidan eng yuqori ballni topuvchi funksiya",
      description: "Ballar ro'yxatini qabul qilib, eng katta ballni qaytaruvchi funksiya yozing.",
    },
    quiz: [
      {
        id: "q-9-1-1",
        question: "Python da ro'yxat oxiriga yangi element qo'shish uchun qaysi metod ishlatiladi?",
        options: ["add()", "push()", "append()", "insertLast()"],
        correctIndex: 2,
        explanation: "append() metodi ro'yxatning oxiriga yangi element qo'shadi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-9-2",
    grade: 9,
    chapterNumber: 2,
    title: "Web-texnologiyalari: HTML va CSS asoslari",
    subtitle: "Veb sahifa tuzilishi, teglari, sarlavha, rasm, havola va uslublar",
    durationMinutes: 45,
    overview: "Internetdagi saytlar qanday ishlaydi? HTML (sahifa skeleti) va CSS (sahifaning go'zal bezaklari) orqali ilk veb-sahifangizni yaratish.",
    sections: [
      {
        title: "1. HTML ning asosiy teglari",
        content: "HTML — gipermatnli belgilash tili:",
        codeExample: `<!DOCTYPE html>
<html>
  <head>
    <title>Mening Informatika Sahifam</title>
  </head>
  <body>
    <h1>Salom Axadboy Nishanov!</h1>
    <p>Bu 9-sinf informatika darsidagi ilk veb sahifam.</p>
    <button>Bosing!</button>
  </body>
</html>`,
        codeLanguage: "html",
      }
    ],
    keyTerms: ["HTML", "CSS", "Tag (Teg)", "<h1>", "<p>", "<a href>", "Selector"],
    practicalTask: {
      title: "Shaxsiy tashrif qog'ozi (Mini Portfolio)",
      description: "HTML da o'zingiz haqingizda kichik sahifa yarating: ismingiz, sevimli IT fani va rasmingiz joylashsin.",
    },
    quiz: [
      {
        id: "q-9-2-1",
        question: "HTML da eng katta o'lchamdagi sarlavha qaysi teg orqali yoziladi?",
        options: ["<h6>", "<head>", "<h1>", "<header>"],
        correctIndex: 2,
        explanation: "<h1> tegi bosh sarlavha hisoblanadi va eng katta o'lchamga ega.",
        points: 10,
      }
    ]
  },

  // 10-sinf
  {
    id: "lesson-10-1",
    grade: 10,
    chapterNumber: 1,
    title: "Ma'lumotlar bazasi va SQL so'rovlar tili",
    subtitle: "Jadvallar, birlamchi kalit (Primary Key), SELECT, INSERT, UPDATE, DELETE",
    durationMinutes: 45,
    overview: "Millionlab foydalanuvchilar ma'lumotlarini qayerda saqlanadi? Relyatsion ma'lumotlar bazalari (RDBMS) va SQL so'rovlar tili asoslari.",
    sections: [
      {
        title: "1. Relyatsion ma'lumotlar bazasi",
        content: "Jadvallar o'zaro bog'langan ustunlar (maydonlar) va qatorlardan (yozuvlardan) tashkil topadi. Har bir yozuvni aniqlash uchun Primary Key (birlamchi kalit) ishlatiladi.",
      },
      {
        title: "2. SQL da asosiy CRUD so'rovlari",
        content: "Ma'lumotlar bilan ishlash buyruqlari:",
        codeExample: `-- Barcha o'quvchilarni olish
SELECT ism, familiya, ball FROM oquvchilar WHERE sinf = 10;

-- Yangi o'quvchi qo'shish
INSERT INTO oquvchilar (ism, sinf, ball) VALUES ('Bekzod', 10, 95);

-- Ma'lumotni yangilash
UPDATE oquvchilar SET ball = 100 WHERE id = 1;`,
        codeLanguage: "sql",
      }
    ],
    keyTerms: ["Database", "SQL", "SELECT", "INSERT", "Primary Key", "Table"],
    practicalTask: {
      title: "Maktab kutubxonasi jadvalini loyihalash",
      description: "Kitoblar jadvali uchun qaysi ustunlar kerakligini va ularning ma'lumot turini yozing.",
    },
    quiz: [
      {
        id: "q-10-1-1",
        question: "SQL tilida jadvaldan ma'lumotlarni tanlab olish uchun qaysi kalit so'z ishlatiladi?",
        options: ["GET", "SELECT", "FIND", "CHOOSE"],
        correctIndex: 1,
        explanation: "SELECT buyrug'i jadvaldagi yozuvlarni filtrlash va olish uchun xizmat qiladi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-10-2",
    grade: 10,
    chapterNumber: 2,
    title: "Kiberxavfsizlik va axborot himoyasi",
    subtitle: "Parollar xavfsizligi, fishing hujumlari, shifrlash va 2FA",
    durationMinutes: 45,
    overview: "Internet olamida o'z ma'lumotlarini himoyalash, kiberjinoyatchilardan ehtiyot bo'lish, ishonchli parollar yaratish va ikki bosqichli autentifikatsiya.",
    sections: [
      {
        title: "1. Kuchli parol qoidalari",
        content: "- Kamida 12-16 ta belgi\n- Katta va kichik harflar (A-Z, a-z)\n- Raqamlar (0-9)\n- Maxsus belgilar (!@#$%&*)\n- Hech qachon tug'ilgan sana yoki ismingizni parol qilmang!",
      }
    ],
    keyTerms: ["Kiberxavfsizlik", "Fishing (Phishing)", "2FA (Ikki bosqichli tasdiqlash)", "Shifrlash", "Zararli dasturlar"],
    practicalTask: {
      title: "Xavfsizlik auditini o'tkazish",
      description: "O'z akkauntlaringiz xavfsizligini tekshirish uchun 5 ta nazorat savolini tuzing.",
    },
    quiz: [
      {
        id: "q-10-2-1",
        question: "Soxta xat yoki havolalar orqali foydalanuvchining login va parolini o'g'irlash kiberhujumi nima deyiladi?",
        options: ["DDoS", "Fishing (Phishing)", "Spam", "Ransomware"],
        correctIndex: 1,
        explanation: "Fishing (Phishing) — soxta veb-sahifalar orqali maxfiy ma'lumotlarni ilintirish usulidir.",
        points: 10,
      }
    ]
  },

  // 11-sinf
  {
    id: "lesson-11-1",
    grade: 11,
    chapterNumber: 1,
    title: "Sun'iy intellekt va Machine Learning asoslari",
    subtitle: "AI tushunchasi, neyron tarmoqlar, kompyuter ko'rishi va NLP",
    durationMinutes: 45,
    overview: "Sun'iy intellekt (AI) qanday ishlaydi? O'rganish turlari (nazorat ostidagi, mustaqil o'rganish), neyron to'rlari va zamonaviy til modellari (LLM).",
    sections: [
      {
        title: "1. Sun'iy intellekt nima?",
        content: "Sun'iy intellekt — inson aqli talab qilinadigan vazifalarni (tasvirni tanish, matn tarjima qilish, qaror qabul qilish, avtomobilni haydash) bajaruvchi kompyuter tizimidir.",
      },
      {
        title: "2. Mashinali o'rganish (Machine Learning)",
        content: "An'anaviy dasturlashda inson qoidalar (kod) yozadi. Machine Learning da esa kompyuterga millionlab ma'lumotlar beriladi va u qoidalarni o'zi kashf qiladi.",
      }
    ],
    keyTerms: ["Sun'iy intellekt (AI)", "Machine Learning", "Neyron tarmoq", "Model", "Dataset", "Prompt"],
    practicalTask: {
      title: "AI loyihasi g'oyasi",
      description: "O'z maktabingizdagi qaysi muammoni sun'iy intellekt yordamida hal qilish mumkinligini tushuntiring (masalan: dars jadvalini optimallash, o'quvchilar davomatini aniqlash).",
    },
    quiz: [
      {
        id: "q-11-1-1",
        question: "Machine Learning (Mashinali o'rganish) ning an'anaviy dasturlashdan asosiy farqi nimada?",
        options: ["U internet talab qilmaydi", "U qoidalarni ma'lumotlar asosida o'zi o'rganadi", "U faqat Python da ishlaydi", "Unda xatoliklar umuman bo'lmaydi"],
        correctIndex: 1,
        explanation: "Machine Learning katta hajmdagi ma'lumotlarni tahlil qilib, qonuniyatlarni o'zi o'rganadi.",
        points: 10,
      }
    ]
  },
  {
    id: "lesson-11-2",
    grade: 11,
    chapterNumber: 2,
    title: "IT loyihalarni rejalashtirish va Zamonaviy IT kasblari",
    subtitle: "Frontend, Backend, DevOps, Data Scientist, UI/UX va Agile/Scrum",
    durationMinutes: 45,
    overview: "Bitiruvchilarga kasb tanlashda yo'l-yo'riq: zamonaviy IT kompaniyalari qanday ishlaydi, jamoaviy loyihalarni boshqarish va portfolio yaratish.",
    sections: [
      {
        title: "1. Zamonaviy IT kasblari",
        content: "- Frontend Developer (Veb interfeyslarini yaratuvchi)\n- Backend Developer (Server va ma'lumotlar bazasi mantiqi)\n- UI/UX Designer (Ilovalar dizayni va qulayligi)\n- Data Analyst / Scientist (Ma'lumotlar tahlilchisi)\n- QA Engineer (Dasturlarni testlovchi)",
      }
    ],
    keyTerms: ["Frontend", "Backend", "Fullstack", "DevOps", "Agile", "Scrum", "Portfolio"],
    practicalTask: {
      title: "O'z orzuingizdagi IT startap konsepsiyasi",
      description: "3 ta paragrafda kelajakda ochmoqchi bo'lgan IT loyihangiz maqsadi, jamoasi va foydasini yozing.",
    },
    quiz: [
      {
        id: "q-11-2-1",
        question: "Veb-saytning foydalanuvchi ko'radigan qismi (tugmalar, ranglar, sahifalar) bilan shug'ullanuvchi mutaxassis kim?",
        options: ["Backend Developer", "Frontend Developer", "DevOps Engineer", "Database Administrator"],
        correctIndex: 1,
        explanation: "Frontend Developer foydalanuvchi ko'radigan va o'zaro aloqa qiladigan vizual qismini yaratadi.",
        points: 10,
      }
    ]
  }
];

export const INITIAL_RESOURCES: LearningResource[] = [
  {
    id: "res-1",
    title: "5-sinf Informatika darsligi (Elektron PDF)",
    description: "Axborot, klaviatura mashqlari, Paint grafik muharriri to'liq darslik nusxasi.",
    grade: 5,
    type: "pdf",
    fileName: "Informatika_5_sinf_darslik.pdf",
    fileUrl: "#",
    fileSize: "14.2 MB",
    uploadedBy: "Axadboy Nishanov",
    createdAt: "2026-09-15",
    downloadCount: 142,
  },
  {
    id: "res-2",
    title: "Python dasturlash tili: 0 dan Professionalgacha",
    description: "8-9 sinflar uchun sintaksis, masalalar to'plami va amaliy kodlar taqdimoti.",
    grade: 8,
    type: "presentation",
    fileName: "Python_Asoslari_Nishanov.pptx",
    fileUrl: "#",
    fileSize: "8.5 MB",
    uploadedBy: "Axadboy Nishanov",
    createdAt: "2026-09-18",
    downloadCount: 310,
  },
  {
    id: "res-3",
    title: "Scratch da o'yin yaratish amaliy videodarsi",
    description: "Labirint va to'p tutish o'yinini qadamma-qadam yaratish bo'yicha master-klass.",
    grade: 6,
    type: "video",
    fileName: "Scratch_Oyini_Masterklass.mp4",
    fileUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    fileSize: "125 MB",
    uploadedBy: "Axadboy Nishanov",
    createdAt: "2026-09-20",
    downloadCount: 228,
  },
  {
    id: "res-4",
    title: "MS Excel formulalari va shablonlar to'plami",
    description: "7-sinf amaliy ishlari uchun tayyor jadvallar va hisoblagich fayli.",
    grade: 7,
    type: "document",
    fileName: "Excel_Amaliyot_7_sinf.xlsx",
    fileUrl: "#",
    fileSize: "3.1 MB",
    uploadedBy: "Axadboy Nishanov",
    createdAt: "2026-09-21",
    downloadCount: 95,
  },
  {
    id: "res-5",
    title: "Sun'iy intellekt va Neyron tarmoqlar Cheat-Sheet",
    description: "11-sinf uchun AI terminlari, formulalari va zamonaviy vositalar jadvali.",
    grade: 11,
    type: "pdf",
    fileName: "AI_Terminlar_Konspekt.pdf",
    fileUrl: "#",
    fileSize: "5.4 MB",
    uploadedBy: "Axadboy Nishanov",
    createdAt: "2026-09-22",
    downloadCount: 184,
  }
];

export const INITIAL_HOMEWORKS: HomeworkTask[] = [
  {
    id: "hw-1",
    title: "Python da kalkulyator dasturi yaratish",
    grade: 8,
    description: "Foydalanuvchidan 2 ta son va amal (+, -, *, /) qabul qilib, natijani chiqaruvchi kod yozing va .py yoki matn ko'rinishida yuklang.",
    attachmentName: "Kalkulyator_shablon.py",
    deadline: "2026-10-05",
    maxScore: 100,
    createdBy: "Axadboy Nishanov",
    createdAt: "2026-09-20",
    submissionsCount: 14,
  },
  {
    id: "hw-2",
    title: "Paint da 'Mening orzuimdagi kompyuter xonasi' rasmi",
    grade: 5,
    description: "Paint dasturida shakllar, ranglar va matn vositasidan foydalanib rasm chizing va faylni yuklang.",
    attachmentName: "Namunaviy_rasm.png",
    deadline: "2026-09-30",
    maxScore: 50,
    createdBy: "Axadboy Nishanov",
    createdAt: "2026-09-21",
    submissionsCount: 22,
  },
  {
    id: "hw-3",
    title: "MS Excel da oylik byudjet hisob-kitob jadvali",
    grade: 7,
    description: "SUM, AVERAGE va IF formulalarini qo'llagan holda oylik xarajatlar jadvalini to'ldiring.",
    deadline: "2026-10-02",
    maxScore: 100,
    createdBy: "Axadboy Nishanov",
    createdAt: "2026-09-22",
    submissionsCount: 18,
  },
  {
    id: "hw-4",
    title: "HTML da shaxsiy veb-sahifa maketi",
    grade: 9,
    description: "index.html faylida o'zingiz haqingizda sarlavha, rasm, havola va jadval elementlarini aks ettiring.",
    deadline: "2026-10-08",
    maxScore: 100,
    createdBy: "Axadboy Nishanov",
    createdAt: "2026-09-23",
    submissionsCount: 9,
  }
];

export const INITIAL_STUDENTS: StudentRecord[] = [];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [];
