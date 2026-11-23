/** Full UI string packs for all 36 locales (buttons/nav/pages). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "messages");

const en = JSON.parse(fs.readFileSync(path.join(outDir, "en.json"), "utf8"));
en.common.useIpLanguage = "Use IP / region language";
en.common.ipActive = "active";
en.common.manualOverride = "Manual override";

const zh = JSON.parse(fs.readFileSync(path.join(outDir, "zh.json"), "utf8"));
zh.common.useIpLanguage = "跟随 IP / 地区语言";
zh.common.ipActive = "已启用";
zh.common.manualOverride = "手动覆盖";
zh.common.followIp = "默认按访问 IP 地区显示语言；可手动切换，也可一键恢复跟 IP。";

/** locale → full message object overrides (deep). Brand name stays Web3Atlas. */
const packs = {
  es: {
    brand: { tagline: "Infraestructura de conocimiento Web3", badge: "Seguridad primero" },
    nav: { explore: "Explorar", ecosystem: "Ecosistema", news: "Noticias", chronicle: "Crónica", security: "Seguridad", glossary: "Glosario" },
    hero: {
      kicker: "8 CAPAS DEL ECOSISTEMA · TOCA PARA APRENDER",
      titleLine1: "Internet está cambiando.",
      titleLine2: "Mapea lo que viene.",
      subtitle: "Descubre redes, protocolos e ideas de Web3 — claridad, no hype.",
      ctaPrimary: "Explorar el ecosistema",
      ctaSecondary: "Abrir centro de seguridad",
      pause: "Pausar animación",
      play: "Reproducir animación",
    },
    sections: {
      ecosystem: "01 · ECOSISTEMA", ecosystemTitle: "Explorar por categoría", ecosystemDesc: "Ocho capas de Web3. Abre una para ver conceptos y patrones reales.", openExplorer: "Abrir explorador",
      news: "02 · SEÑAL", newsTitle: "Qué se mueve", newsDesc: "Titulares seleccionados sobre infraestructura, mercados y regulación.", allHeadlines: "Todos los titulares",
      glossary: "03 · LÉXICO", glossaryTitle: "Habla el idioma", glossaryDesc: "Definiciones rápidas de términos on-chain cotidianos.", openGlossary: "Abrir glosario",
      security: "04 · DEFENSA", securityTitle: "Hazte difícil de hackear", securityDesc: "Guías breves sobre phishing, approvals, semillas y apps falsas.", securityCenter: "Centro de seguridad",
      chronicle: "05 · LÍNEA DE TIEMPO", chronicleTitle: "Cómo llegamos aquí", chronicleDesc: "Crónica desde el whitepaper hasta los ETF.", fullChronicle: "Crónica completa",
      quiz: "06 · RETO", quizTitle: "Pon a prueba lo que sabes", quizDesc: "Diez preguntas rápidas. Sin cuenta.", startQuiz: "Empezar el reto", shuffle: "Barajar",
    },
    common: { readMore: "Leer más", back: "Volver", search: "Buscar", items: "ítems", minRead: "{m} min de lectura", language: "Idioma", followIp: "El idioma sigue tu región (IP). Puedes cambiarlo manualmente.", fallbackNote: "Mostrando contenido localizado.", noResults: "Sin resultados.", useful: "Útil", useIpLanguage: "Usar idioma por IP / región", ipActive: "activo", manualOverride: "Cambio manual" },
    ecosystemPage: { title: "Explorador del ecosistema", subtitle: "Ocho capas — de cadenas base a DAOs." },
    newsPage: { title: "Mesa de señales", subtitle: "Titulares Web3 para builders y lectores curiosos." },
    chroniclePage: { title: "Crónica", subtitle: "Momentos que reshaped el dinero digital." },
    securityPage: { title: "Centro de seguridad", subtitle: "Defensas prácticas para wallets y phishing." },
    glossaryPage: { title: "Glosario", subtitle: "Definiciones claras del vocabulario on-chain.", placeholder: "Filtrar términos…" },
    quiz: { correct: "Correcto", wrong: "Casi", next: "Siguiente", restart: "Reiniciar", score: "Puntuación: {score}/{total}", done: "Reto completado" },
    article: { keyPoints: "Puntos clave", tips: "Consejos prácticos", checklist: "Lista de control", expand: "Expandir", collapse: "Cerrar" },
  },
  ja: {
    brand: { tagline: "Web3ナレッジ基盤", badge: "セキュリティ優先" },
    nav: { explore: "探索", ecosystem: "エコシステム", news: "ニュース", chronicle: "年表", security: "セキュリティ", glossary: "用語集" },
    hero: {
      kicker: "8つのエコシステム層 · タップして学ぶ",
      titleLine1: "インターネットは変わりつつある。",
      titleLine2: "次を地図にする。",
      subtitle: "Web3を形作るネットワークとアイデアを、誇張ではなく明快に。",
      ctaPrimary: "エコシステムを見る",
      ctaSecondary: "セキュリティセンター",
      pause: "アニメ停止",
      play: "アニメ再生",
    },
    sections: {
      ecosystem: "01 · エコシステム", ecosystemTitle: "カテゴリで探索", ecosystemDesc: "Web3の8層。概念と現実のパターンを見る。", openExplorer: "エクスプローラーを開く",
      news: "02 · シグナル", newsTitle: "いま動いていること", newsDesc: "インフラ・市場・規制の厳選ヘッドライン。", allHeadlines: "すべての見出し",
      glossary: "03 · レキシコン", glossaryTitle: "同じ言葉で話す", glossaryDesc: "オンチェーン日常用語の素早い定義。", openGlossary: "用語集を開く",
      security: "04 · 防御", securityTitle: "ハックされにくく", securityDesc: "フィッシング、承認、シード、偽アプリの短報。", securityCenter: "セキュリティセンター",
      chronicle: "05 · タイムライン", chronicleTitle: "ここまでの道", chronicleDesc: "ホワイトペーパーからETFまでの年表。", fullChronicle: "全文年表",
      quiz: "06 · チャレンジ", quizTitle: "知識を試す", quizDesc: "10問。アカウント不要。", startQuiz: "開始", shuffle: "シャッフル",
    },
    common: { readMore: "続きを読む", back: "戻る", search: "検索", items: "件", minRead: "約{m}分", language: "言語", followIp: "言語は地域（IP）に従います。手動切替も可能です。", fallbackNote: "ローカライズ済みコンテンツを表示中。", noResults: "一致なし", useful: "役立つ", useIpLanguage: "IP / 地域の言語に従う", ipActive: "有効", manualOverride: "手動上書き" },
    ecosystemPage: { title: "エコシステム探索", subtitle: "ベースチェーンからDAOまで8層。" },
    newsPage: { title: "シグナルデスク", subtitle: "ビルダー向けWeb3ヘッドライン。" },
    chroniclePage: { title: "年表", subtitle: "デジタルマネーを変えた瞬間。" },
    securityPage: { title: "セキュリティセンター", subtitle: "ウォレットとソーシャル工学への実践的防御。" },
    glossaryPage: { title: "用語集", subtitle: "オンチェーン語彙の平易な定義。", placeholder: "用語を絞り込み…" },
    quiz: { correct: "正解", wrong: "残念", next: "次へ", restart: "再挑戦", score: "スコア: {score}/{total}", done: "完了" },
    article: { keyPoints: "要点", tips: "実践Tips", checklist: "チェックリスト", expand: "解説を開く", collapse: "閉じる" },
  },
  ko: {
    brand: { tagline: "Web3 지식 인프라", badge: "보안 우선" },
    nav: { explore: "탐색", ecosystem: "생태계", news: "뉴스", chronicle: "연대기", security: "보안", glossary: "용어집" },
    hero: {
      kicker: "8개 생태계 계층 · 탭하여 학습",
      titleLine1: "인터넷이 바뀌고 있습니다.",
      titleLine2: "다음을 지도로.",
      subtitle: "과장 없이 Web3 네트워크와 아이디어를 발견하세요.",
      ctaPrimary: "생태계 살펴보기",
      ctaSecondary: "보안 센터",
      pause: "애니메이션 일시정지",
      play: "애니메이션 재생",
    },
    sections: {
      ecosystem: "01 · 생태계", ecosystemTitle: "카테고리로 탐색", ecosystemDesc: "Web3의 8개 계층. 개념과 실제 패턴을 확인하세요.", openExplorer: "탐색기 열기",
      news: "02 · 시그널", newsTitle: "지금 움직이는 것", newsDesc: "인프라·시장·규제 큐레이션 헤드라인.", allHeadlines: "모든 헤드라인",
      glossary: "03 · 렉시콘", glossaryTitle: "같은 언어로", glossaryDesc: "온체인 일상 용어의 빠른 정의.", openGlossary: "용어집 열기",
      security: "04 · 방어", securityTitle: "해킹되기 어렵게", securityDesc: "피싱, 승인, 시드, 가짜 앱 브리핑.", securityCenter: "보안 센터",
      chronicle: "05 · 타임라인", chronicleTitle: "여기까지 온 길", chronicleDesc: "백서부터 ETF까지의 연대기.", fullChronicle: "전체 연대기",
      quiz: "06 · 챌린지", quizTitle: "지식을 시험하세요", quizDesc: "10문항. 계정 불필요.", startQuiz: "시작", shuffle: "섞기",
    },
    common: { readMore: "더 읽기", back: "뒤로", search: "검색", items: "항목", minRead: "약 {m}분", language: "언어", followIp: "언어는 지역(IP)을 따릅니다. 수동 변경 가능.", fallbackNote: "현지화 콘텐츠 표시 중.", noResults: "결과 없음", useful: "유용함", useIpLanguage: "IP / 지역 언어 사용", ipActive: "활성", manualOverride: "수동 설정" },
    ecosystemPage: { title: "생태계 탐색기", subtitle: "베이스 체인부터 DAO까지 8계층." },
    newsPage: { title: "시그널 데스크", subtitle: "빌더를 위한 Web3 헤드라인." },
    chroniclePage: { title: "연대기", subtitle: "디지털 머니를 바꾼 순간들." },
    securityPage: { title: "보안 센터", subtitle: "지갑과 사회공학에 대한 실전 방어." },
    glossaryPage: { title: "용어집", subtitle: "온체인 어휘의 쉬운 정의.", placeholder: "용어 필터…" },
    quiz: { correct: "정답", wrong: "아쉬워요", next: "다음", restart: "다시", score: "점수: {score}/{total}", done: "완료" },
    article: { keyPoints: "핵심 포인트", tips: "실전 팁", checklist: "체크리스트", expand: "설명 펼치기", collapse: "접기" },
  },
  fr: {
    brand: { tagline: "Infrastructure de connaissance Web3", badge: "Sécurité d'abord" },
    nav: { explore: "Explorer", ecosystem: "Écosystème", news: "Actus", chronicle: "Chronique", security: "Sécurité", glossary: "Glossaire" },
    hero: {
      kicker: "8 COUCHES D'ÉCOSYSTÈME · APPUYEZ POUR APPRENDRE",
      titleLine1: "Internet change.",
      titleLine2: "Cartographiez la suite.",
      subtitle: "Réseaux, protocoles et idées Web3 — clarté, pas de hype.",
      ctaPrimary: "Explorer l'écosystème",
      ctaSecondary: "Centre sécurité",
      pause: "Pause animation",
      play: "Lancer l'animation",
    },
    sections: {
      ecosystem: "01 · ÉCOSYSTÈME", ecosystemTitle: "Explorer par catégorie", ecosystemDesc: "Huit couches du Web3. Ouvrez-en une pour voir concepts et patterns.", openExplorer: "Ouvrir l'explorateur",
      news: "02 · SIGNAL", newsTitle: "Ce qui bouge", newsDesc: "Titres sélectionnés : infra, marchés, régulation.", allHeadlines: "Tous les titres",
      glossary: "03 · LEXIQUE", glossaryTitle: "Parler le même langage", glossaryDesc: "Définitions rapides des termes on-chain.", openGlossary: "Ouvrir le glossaire",
      security: "04 · DÉFENSE", securityTitle: "Restez dur à pirater", securityDesc: "Briefs phishing, approvals, seed et fausses apps.", securityCenter: "Centre sécurité",
      chronicle: "05 · TIMELINE", chronicleTitle: "Comment on en est arrivés là", chronicleDesc: "Du whitepaper aux ETF.", fullChronicle: "Chronique complète",
      quiz: "06 · DÉFI", quizTitle: "Testez vos connaissances", quizDesc: "Dix questions. Sans compte.", startQuiz: "Commencer", shuffle: "Mélanger",
    },
    common: { readMore: "Lire plus", back: "Retour", search: "Rechercher", items: "éléments", minRead: "{m} min", language: "Langue", followIp: "La langue suit votre région (IP). Modifiable manuellement.", fallbackNote: "Contenu localisé.", noResults: "Aucun résultat.", useful: "Utile", useIpLanguage: "Langue selon IP / région", ipActive: "actif", manualOverride: "Override manuel" },
    ecosystemPage: { title: "Explorateur d'écosystème", subtitle: "Huit couches — des chaînes de base aux DAO." },
    newsPage: { title: "Bureau des signaux", subtitle: "Titres Web3 pour builders et curieux." },
    chroniclePage: { title: "Chronique", subtitle: "Moments qui ont reshaped l'argent numérique." },
    securityPage: { title: "Centre de sécurité", subtitle: "Défenses pratiques wallets et ingénierie sociale." },
    glossaryPage: { title: "Glossaire", subtitle: "Définitions claires du vocabulaire on-chain.", placeholder: "Filtrer…" },
    quiz: { correct: "Correct", wrong: "Presque", next: "Suivant", restart: "Recommencer", score: "Score : {score}/{total}", done: "Défi terminé" },
    article: { keyPoints: "Points clés", tips: "Conseils pratiques", checklist: "Checklist", expand: "Développer", collapse: "Réduire" },
  },
  de: {
    brand: { tagline: "Web3-Wissensinfrastruktur", badge: "Sicherheit zuerst" },
    nav: { explore: "Entdecken", ecosystem: "Ökosystem", news: "News", chronicle: "Chronik", security: "Sicherheit", glossary: "Glossar" },
    hero: {
      kicker: "8 ÖKOSYSTEM-SCHICHTEN · TIPPEN ZUM LERNEN",
      titleLine1: "Das Internet verändert sich.",
      titleLine2: "Kartiere was kommt.",
      subtitle: "Netzwerke, Protokolle und Web3-Ideen — klar, ohne Hype.",
      ctaPrimary: "Ökosystem erkunden",
      ctaSecondary: "Sicherheitszentrum",
      pause: "Animation pausieren",
      play: "Animation abspielen",
    },
    sections: {
      ecosystem: "01 · ÖKOSYSTEM", ecosystemTitle: "Nach Kategorie erkunden", ecosystemDesc: "Acht Web3-Schichten. Konzepte und reale Muster öffnen.", openExplorer: "Explorer öffnen",
      news: "02 · SIGNAL", newsTitle: "Was sich bewegt", newsDesc: "Kuratierte Headlines zu Infra, Märkten und Regulierung.", allHeadlines: "Alle Headlines",
      glossary: "03 · LEXIKON", glossaryTitle: "Dieselbe Sprache sprechen", glossaryDesc: "Schnelle Definitionen für On-Chain-Alltag.", openGlossary: "Glossar öffnen",
      security: "04 · ABWEHR", securityTitle: "Schwer zu hacken bleiben", securityDesc: "Kurzbriefings zu Phishing, Approvals, Seed und Fake-Apps.", securityCenter: "Sicherheitszentrum",
      chronicle: "05 · ZEITLEISTE", chronicleTitle: "Wie wir hierher kamen", chronicleDesc: "Vom Whitepaper zu ETFs.", fullChronicle: "Volle Chronik",
      quiz: "06 · CHALLENGE", quizTitle: "Wissen stress-testen", quizDesc: "Zehn Fragen. Kein Account.", startQuiz: "Starten", shuffle: "Mischen",
    },
    common: { readMore: "Mehr lesen", back: "Zurück", search: "Suchen", items: "Einträge", minRead: "{m} Min. Lesezeit", language: "Sprache", followIp: "Sprache folgt Ihrer Region (IP). Manuell änderbar.", fallbackNote: "Lokalisierter Inhalt.", noResults: "Keine Treffer.", useful: "Nützlich", useIpLanguage: "IP-/Regionssprache nutzen", ipActive: "aktiv", manualOverride: "Manuell" },
    ecosystemPage: { title: "Ökosystem-Explorer", subtitle: "Acht Schichten — von Base-Chains bis DAOs." },
    newsPage: { title: "Signal-Desk", subtitle: "Web3-Headlines für Builder und Neugierige." },
    chroniclePage: { title: "Chronik", subtitle: "Momente, die digitales Geld veränderten." },
    securityPage: { title: "Sicherheitszentrum", subtitle: "Praktischer Schutz für Wallets und Social Engineering." },
    glossaryPage: { title: "Glossar", subtitle: "Klare Definitionen für On-Chain-Vokabular.", placeholder: "Begriffe filtern…" },
    quiz: { correct: "Richtig", wrong: "Nicht ganz", next: "Weiter", restart: "Neu starten", score: "Punktzahl: {score}/{total}", done: "Fertig" },
    article: { keyPoints: "Kernpunkte", tips: "Praxistipps", checklist: "Checkliste", expand: "Erklären", collapse: "Zuklappen" },
  },
  pt: {
    brand: { tagline: "Infraestrutura de conhecimento Web3", badge: "Segurança primeiro" },
    nav: { explore: "Explorar", ecosystem: "Ecossistema", news: "Notícias", chronicle: "Crônica", security: "Segurança", glossary: "Glossário" },
    hero: { kicker: "8 CAMADAS · TOQUE PARA APRENDER", titleLine1: "A internet está mudando.", titleLine2: "Mapeie o que vem.", subtitle: "Redes, protocolos e ideias Web3 — clareza, sem hype.", ctaPrimary: "Explorar ecossistema", ctaSecondary: "Centro de segurança", pause: "Pausar", play: "Reproduzir" },
    sections: { ecosystem: "01 · ECOSSISTEMA", ecosystemTitle: "Explorar por categoria", ecosystemDesc: "Oito camadas do Web3.", openExplorer: "Abrir explorador", news: "02 · SINAL", newsTitle: "O que está em movimento", newsDesc: "Manchetes curadas.", allHeadlines: "Todas as manchetes", glossary: "03 · LÉXICO", glossaryTitle: "Fale a língua", glossaryDesc: "Definições rápidas on-chain.", openGlossary: "Abrir glossário", security: "04 · DEFESA", securityTitle: "Fique difícil de hackear", securityDesc: "Phishing, approvals e seeds.", securityCenter: "Centro de segurança", chronicle: "05 · LINHA DO TEMPO", chronicleTitle: "Como chegamos aqui", chronicleDesc: "Do whitepaper aos ETFs.", fullChronicle: "Crônica completa", quiz: "06 · DESAFIO", quizTitle: "Teste o que sabe", quizDesc: "Dez perguntas.", startQuiz: "Começar", shuffle: "Embaralhar" },
    common: { readMore: "Ler mais", back: "Voltar", search: "Buscar", items: "itens", minRead: "{m} min", language: "Idioma", followIp: "O idioma segue sua região (IP).", fallbackNote: "Conteúdo localizado.", noResults: "Sem resultados.", useful: "Útil", useIpLanguage: "Usar idioma por IP", ipActive: "ativo", manualOverride: "Manual" },
    ecosystemPage: { title: "Explorador do ecossistema", subtitle: "Oito camadas — de chains a DAOs." },
    newsPage: { title: "Mesa de sinais", subtitle: "Manchetes Web3 para builders." },
    chroniclePage: { title: "Crônica", subtitle: "Momentos que remodelaram o dinheiro digital." },
    securityPage: { title: "Centro de segurança", subtitle: "Defesas práticas." },
    glossaryPage: { title: "Glossário", subtitle: "Definições claras.", placeholder: "Filtrar…" },
    quiz: { correct: "Correto", wrong: "Quase", next: "Próximo", restart: "Reiniciar", score: "Pontuação: {score}/{total}", done: "Concluído" },
    article: { keyPoints: "Pontos-chave", tips: "Dicas práticas", checklist: "Checklist", expand: "Expandir", collapse: "Recolher" },
  },
  ru: {
    brand: { tagline: "Инфраструктура знаний Web3", badge: "Безопасность прежде всего" },
    nav: { explore: "Обзор", ecosystem: "Экосистема", news: "Новости", chronicle: "Хроника", security: "Безопасность", glossary: "Глоссарий" },
    hero: { kicker: "8 СЛОЁВ · НАЖМИТЕ, ЧТОБЫ УЧИТЬСЯ", titleLine1: "Интернет меняется.", titleLine2: "Нанесите на карту будущее.", subtitle: "Сети, протоколы и идеи Web3 — без хайпа.", ctaPrimary: "Открыть экосистему", ctaSecondary: "Центр безопасности", pause: "Пауза", play: "Играть" },
    sections: { ecosystem: "01 · ЭКОСИСТЕМА", ecosystemTitle: "По категориям", ecosystemDesc: "Восемь слоёв Web3.", openExplorer: "Открыть", news: "02 · СИГНАЛ", newsTitle: "Что движется", newsDesc: "Подборка заголовков.", allHeadlines: "Все заголовки", glossary: "03 · ЛЕКСИКОН", glossaryTitle: "Говорите на одном языке", glossaryDesc: "Быстрые определения.", openGlossary: "Открыть глоссарий", security: "04 · ЗАЩИТА", securityTitle: "Сложнее взломать", securityDesc: "Фишинг, approve, seed.", securityCenter: "Центр безопасности", chronicle: "05 · ТАЙМЛАЙН", chronicleTitle: "Как мы сюда пришли", chronicleDesc: "От whitepaper до ETF.", fullChronicle: "Полная хроника", quiz: "06 · ЧЕЛЛЕНДЖ", quizTitle: "Проверьте знания", quizDesc: "Десять вопросов.", startQuiz: "Начать", shuffle: "Перемешать" },
    common: { readMore: "Читать далее", back: "Назад", search: "Поиск", items: "шт.", minRead: "{m} мин", language: "Язык", followIp: "Язык следует региону (IP).", fallbackNote: "Локализованный контент.", noResults: "Нет совпадений.", useful: "Полезно", useIpLanguage: "Язык по IP", ipActive: "вкл.", manualOverride: "Вручную" },
    ecosystemPage: { title: "Обзор экосистемы", subtitle: "Восемь слоёв — от базовых сетей до DAO." },
    newsPage: { title: "Сигнальный стол", subtitle: "Заголовки Web3 для билдеров." },
    chroniclePage: { title: "Хроника", subtitle: "Моменты, изменившие цифровые деньги." },
    securityPage: { title: "Центр безопасности", subtitle: "Практическая защита." },
    glossaryPage: { title: "Глоссарий", subtitle: "Понятные определения.", placeholder: "Фильтр…" },
    quiz: { correct: "Верно", wrong: "Не совсем", next: "Далее", restart: "Заново", score: "Счёт: {score}/{total}", done: "Готово" },
    article: { keyPoints: "Ключевые пункты", tips: "Практические советы", checklist: "Чеклист", expand: "Раскрыть", collapse: "Свернуть" },
  },
  ar: {
    brand: { tagline: "بنية معرفة Web3", badge: "الأمان أولاً" },
    nav: { explore: "استكشف", ecosystem: "النظام", news: "أخبار", chronicle: "سجل", security: "الأمان", glossary: "قاموس" },
    hero: { kicker: "8 طبقات · اضغط للتعلّم", titleLine1: "الإنترنت يتغيّر.", titleLine2: "ارسم ما يأتي.", subtitle: "اكتشف الشبكات والأفكار بوضوح دون ضجيج.", ctaPrimary: "استكشف النظام", ctaSecondary: "مركز الأمان", pause: "إيقاف", play: "تشغيل" },
    sections: { ecosystem: "01 · النظام", ecosystemTitle: "استكشف حسب الفئة", ecosystemDesc: "ثماني طبقات من Web3.", openExplorer: "افتح المستكشف", news: "02 · إشارة", newsTitle: "ما يتحرك", newsDesc: "عناوين مختارة.", allHeadlines: "كل العناوين", glossary: "03 · معجم", glossaryTitle: "تحدّث بنفس اللغة", glossaryDesc: "تعريفات سريعة.", openGlossary: "افتح القاموس", security: "04 · دفاع", securityTitle: "كن أصعب للاختراق", securityDesc: "تصيّد وموافقات وبذور.", securityCenter: "مركز الأمان", chronicle: "05 · خط زمني", chronicleTitle: "كيف وصلنا هنا", chronicleDesc: "من الورقة البيضاء إلى ETF.", fullChronicle: "السجل الكامل", quiz: "06 · تحدٍ", quizTitle: "اختبر معرفتك", quizDesc: "عشرة أسئلة.", startQuiz: "ابدأ", shuffle: "خلط" },
    common: { readMore: "اقرأ المزيد", back: "رجوع", search: "بحث", items: "عناصر", minRead: "{m} دقائق", language: "اللغة", followIp: "اللغة تتبع منطقتك (IP).", fallbackNote: "محتوى مترجم.", noResults: "لا نتائج.", useful: "مفيد", useIpLanguage: "لغة حسب IP", ipActive: "مفعّل", manualOverride: "يدوي" },
    ecosystemPage: { title: "مستكشف النظام", subtitle: "ثماني طبقات." },
    newsPage: { title: "منصة الإشارات", subtitle: "عناوين Web3." },
    chroniclePage: { title: "السجل", subtitle: "لحظات غيّرت المال الرقمي." },
    securityPage: { title: "مركز الأمان", subtitle: "دفاعات عملية." },
    glossaryPage: { title: "القاموس", subtitle: "تعريفات واضحة.", placeholder: "تصفية…" },
    quiz: { correct: "صحيح", wrong: "ليس تماماً", next: "التالي", restart: "إعادة", score: "النتيجة: {score}/{total}", done: "اكتمل" },
    article: { keyPoints: "نقاط أساسية", tips: "نصائح عملية", checklist: "قائمة تحقق", expand: "توسيع", collapse: "طي" },
  },
  hi: {
    brand: { tagline: "Web3 ज्ञान अवसंरचना", badge: "सुरक्षा पहले" },
    nav: { explore: "खोजें", ecosystem: "इकोसिस्टम", news: "समाचार", chronicle: "इतिहास", security: "सुरक्षा", glossary: "शब्दावली" },
    hero: { kicker: "8 परतें · सीखने के लिए टैप करें", titleLine1: "इंटरनेट बदल रहा है।", titleLine2: "आगे का नक्शा बनाएँ।", subtitle: "स्पष्टता के साथ Web3 नेटवर्क और विचार।", ctaPrimary: "इकोसिस्टम देखें", ctaSecondary: "सुरक्षा केंद्र", pause: "रोकें", play: "चलाएँ" },
    sections: { ecosystem: "01 · इकोसिस्टम", ecosystemTitle: "श्रेणी से खोजें", ecosystemDesc: "Web3 की आठ परतें।", openExplorer: "एक्सप्लोरर खोलें", news: "02 · सिग्नल", newsTitle: "क्या चल रहा है", newsDesc: "चुनिंदा सुर्खियाँ।", allHeadlines: "सभी सुर्खियाँ", glossary: "03 · शब्दकोश", glossaryTitle: "एक भाषा बोलें", glossaryDesc: "त्वरित परिभाषाएँ।", openGlossary: "शब्दावली खोलें", security: "04 · रक्षा", securityTitle: "हैक होना कठिन बनाएँ", securityDesc: "फिशिंग, अप्रूव, सीड।", securityCenter: "सुरक्षा केंद्र", chronicle: "05 · समयरेखा", chronicleTitle: "यहाँ तक कैसे पहुँचे", chronicleDesc: "व्हाइटपेपर से ETF तक।", fullChronicle: "पूर्ण इतिहास", quiz: "06 · चुनौती", quizTitle: "ज्ञान जाँचें", quizDesc: "दस प्रश्न।", startQuiz: "शुरू", shuffle: "शफल" },
    common: { readMore: "और पढ़ें", back: "वापस", search: "खोज", items: "आइटम", minRead: "{m} मिनट", language: "भाषा", followIp: "भाषा आपके क्षेत्र (IP) का अनुसरण करती है।", fallbackNote: "स्थानीयकृत सामग्री।", noResults: "कोई परिणाम नहीं।", useful: "उपयोगी", useIpLanguage: "IP भाषा उपयोग करें", ipActive: "सक्रिय", manualOverride: "मैन्युअल" },
    ecosystemPage: { title: "इकोसिस्टम एक्सप्लोरर", subtitle: "आठ परतें।" },
    newsPage: { title: "सिग्नल डेस्क", subtitle: "Web3 सुर्खियाँ।" },
    chroniclePage: { title: "इतिहास", subtitle: "डिजिटल धन के पल।" },
    securityPage: { title: "सुरक्षा केंद्र", subtitle: "व्यावहारिक रक्षा।" },
    glossaryPage: { title: "शब्दावली", subtitle: "स्पष्ट परिभाषाएँ।", placeholder: "फ़िल्टर…" },
    quiz: { correct: "सही", wrong: "लगभग", next: "आगे", restart: "फिर से", score: "स्कोर: {score}/{total}", done: "पूर्ण" },
    article: { keyPoints: "मुख्य बिंदु", tips: "व्यावहारिक सुझाव", checklist: "चेकलिस्ट", expand: "विस्तार", collapse: "संक्षिप्त" },
  },
  vi: {
    brand: { tagline: "Hạ tầng tri thức Web3", badge: "Bảo mật trước" },
    nav: { explore: "Khám phá", ecosystem: "Hệ sinh thái", news: "Tin tức", chronicle: "Niên biểu", security: "Bảo mật", glossary: "Thuật ngữ" },
    hero: { kicker: "8 LỚP · CHẠM ĐỂ HỌC", titleLine1: "Internet đang đổi.", titleLine2: "Vẽ bản đồ phía trước.", subtitle: "Mạng lưới và ý tưởng Web3 — rõ ràng, không hype.", ctaPrimary: "Khám phá hệ sinh thái", ctaSecondary: "Trung tâm bảo mật", pause: "Tạm dừng", play: "Phát" },
    sections: { ecosystem: "01 · HỆ SINH THÁI", ecosystemTitle: "Theo danh mục", ecosystemDesc: "Tám lớp Web3.", openExplorer: "Mở explorer", news: "02 · TÍN HIỆU", newsTitle: "Điều đang chuyển động", newsDesc: "Tiêu đề chọn lọc.", allHeadlines: "Tất cả tiêu đề", glossary: "03 · TỪ VỰNG", glossaryTitle: "Nói cùng ngôn ngữ", glossaryDesc: "Định nghĩa nhanh.", openGlossary: "Mở thuật ngữ", security: "04 · PHÒNG THỦ", securityTitle: "Khó bị hack hơn", securityDesc: "Phishing, approve, seed.", securityCenter: "Trung tâm bảo mật", chronicle: "05 · DÒNG THỜI GIAN", chronicleTitle: "Ta đã đến đây thế nào", chronicleDesc: "Từ whitepaper đến ETF.", fullChronicle: "Niên biểu đầy đủ", quiz: "06 · THỬ THÁCH", quizTitle: "Kiểm tra kiến thức", quizDesc: "Mười câu hỏi.", startQuiz: "Bắt đầu", shuffle: "Xáo" },
    common: { readMore: "Đọc thêm", back: "Quay lại", search: "Tìm", items: "mục", minRead: "{m} phút", language: "Ngôn ngữ", followIp: "Ngôn ngữ theo khu vực (IP).", fallbackNote: "Nội dung đã địa phương hóa.", noResults: "Không có kết quả.", useful: "Hữu ích", useIpLanguage: "Dùng ngôn ngữ theo IP", ipActive: "đang bật", manualOverride: "Thủ công" },
    ecosystemPage: { title: "Khám phá hệ sinh thái", subtitle: "Tám lớp." },
    newsPage: { title: "Bàn tín hiệu", subtitle: "Tiêu đề Web3." },
    chroniclePage: { title: "Niên biểu", subtitle: "Khoảnh khắc định hình tiền số." },
    securityPage: { title: "Trung tâm bảo mật", subtitle: "Phòng thủ thực tế." },
    glossaryPage: { title: "Thuật ngữ", subtitle: "Định nghĩa dễ hiểu.", placeholder: "Lọc…" },
    quiz: { correct: "Đúng", wrong: "Chưa đúng", next: "Tiếp", restart: "Làm lại", score: "Điểm: {score}/{total}", done: "Hoàn tất" },
    article: { keyPoints: "Điểm chính", tips: "Mẹo thực tế", checklist: "Checklist", expand: "Mở rộng", collapse: "Thu gọn" },
  },
  id: {
    brand: { tagline: "Infrastruktur pengetahuan Web3", badge: "Keamanan dulu" },
    nav: { explore: "Jelajah", ecosystem: "Ekosistem", news: "Berita", chronicle: "Kronik", security: "Keamanan", glossary: "Glosarium" },
    hero: { kicker: "8 LAPISAN · KETUK UNTUK BELAJAR", titleLine1: "Internet sedang berubah.", titleLine2: "Petakan apa yang datang.", subtitle: "Jaringan dan ide Web3 — jelas, tanpa hype.", ctaPrimary: "Jelajahi ekosistem", ctaSecondary: "Pusat keamanan", pause: "Jeda", play: "Putar" },
    sections: { ecosystem: "01 · EKOSISTEM", ecosystemTitle: "Jelajah per kategori", ecosystemDesc: "Delapan lapisan Web3.", openExplorer: "Buka explorer", news: "02 · SINYAL", newsTitle: "Yang sedang bergerak", newsDesc: "Headline pilihan.", allHeadlines: "Semua headline", glossary: "03 · LEKSIKON", glossaryTitle: "Bicara bahasa yang sama", glossaryDesc: "Definisi cepat.", openGlossary: "Buka glosarium", security: "04 · PERTAHANAN", securityTitle: "Sulit di-hack", securityDesc: "Phishing, approve, seed.", securityCenter: "Pusat keamanan", chronicle: "05 · LINIMASA", chronicleTitle: "Bagaimana kita sampai di sini", chronicleDesc: "Dari whitepaper ke ETF.", fullChronicle: "Kronik penuh", quiz: "06 · TANTANGAN", quizTitle: "Uji pengetahuan", quizDesc: "Sepuluh pertanyaan.", startQuiz: "Mulai", shuffle: "Acak" },
    common: { readMore: "Baca lagi", back: "Kembali", search: "Cari", items: "item", minRead: "{m} mnt", language: "Bahasa", followIp: "Bahasa mengikuti wilayah (IP).", fallbackNote: "Konten dilokalkan.", noResults: "Tidak ada hasil.", useful: "Berguna", useIpLanguage: "Gunakan bahasa IP", ipActive: "aktif", manualOverride: "Manual" },
    ecosystemPage: { title: "Penjelajah ekosistem", subtitle: "Delapan lapisan." },
    newsPage: { title: "Meja sinyal", subtitle: "Headline Web3." },
    chroniclePage: { title: "Kronik", subtitle: "Momen yang membentuk uang digital." },
    securityPage: { title: "Pusat keamanan", subtitle: "Pertahanan praktis." },
    glossaryPage: { title: "Glosarium", subtitle: "Definisi jelas.", placeholder: "Filter…" },
    quiz: { correct: "Benar", wrong: "Belum tepat", next: "Lanjut", restart: "Ulang", score: "Skor: {score}/{total}", done: "Selesai" },
    article: { keyPoints: "Poin utama", tips: "Tips praktis", checklist: "Checklist", expand: "Perluas", collapse: "Tutup" },
  },
  th: {
    brand: { tagline: "โครงสร้างความรู้ Web3", badge: "ความปลอดภัยมาก่อน" },
    nav: { explore: "สำรวจ", ecosystem: "ระบบนิเวศ", news: "ข่าว", chronicle: "ไทม์ไลน์", security: "ความปลอดภัย", glossary: "คำศัพท์" },
    hero: { kicker: "8 ชั้น · แตะเพื่อเรียนรู้", titleLine1: "อินเทอร์เน็ตกำลังเปลี่ยน", titleLine2: "วาดแผนที่สิ่งถัดไป", subtitle: "เครือข่ายและไอเดีย Web3 อย่างชัดเจน", ctaPrimary: "สำรวจระบบนิเวศ", ctaSecondary: "ศูนย์ความปลอดภัย", pause: "หยุด", play: "เล่น" },
    sections: { ecosystem: "01 · ระบบนิเวศ", ecosystemTitle: "สำรวจตามหมวด", ecosystemDesc: "แปดชั้นของ Web3", openExplorer: "เปิดตัวสำรวจ", news: "02 · สัญญาณ", newsTitle: "สิ่งที่กำลังเคลื่อนไหว", newsDesc: "หัวข้อคัดสรร", allHeadlines: "หัวข้อทั้งหมด", glossary: "03 · คำศัพท์", glossaryTitle: "พูดภาษาเดียวกัน", glossaryDesc: "คำนิยามเร็ว", openGlossary: "เปิดคำศัพท์", security: "04 · ป้องกัน", securityTitle: "ทำให้แฮกยากขึ้น", securityDesc: "ฟิชชิง approve ซีด", securityCenter: "ศูนย์ความปลอดภัย", chronicle: "05 · ไทม์ไลน์", chronicleTitle: "เรามาถึงตรงนี้ได้อย่างไร", chronicleDesc: "จากไวท์เปเปอร์ถึง ETF", fullChronicle: "ไทม์ไลน์เต็ม", quiz: "06 · ท้าทาย", quizTitle: "ทดสอบความรู้", quizDesc: "สิบข้อ", startQuiz: "เริ่ม", shuffle: "สลับ" },
    common: { readMore: "อ่านเพิ่ม", back: "กลับ", search: "ค้นหา", items: "รายการ", minRead: "{m} นาที", language: "ภาษา", followIp: "ภาษาตามภูมิภาค (IP)", fallbackNote: "เนื้อหาท้องถิ่น", noResults: "ไม่พบ", useful: "มีประโยชน์", useIpLanguage: "ใช้ภาษาตาม IP", ipActive: "เปิดใช้", manualOverride: "ปรับเอง" },
    ecosystemPage: { title: "สำรวจระบบนิเวศ", subtitle: "แปดชั้น" },
    newsPage: { title: "โต๊ะสัญญาณ", subtitle: "หัวข้อ Web3" },
    chroniclePage: { title: "ไทม์ไลน์", subtitle: "ช่วงเวลาที่เปลี่ยนเงินดิจิทัล" },
    securityPage: { title: "ศูนย์ความปลอดภัย", subtitle: "การป้องกันจริง" },
    glossaryPage: { title: "คำศัพท์", subtitle: "คำนิยามชัดเจน", placeholder: "กรอง…" },
    quiz: { correct: "ถูก", wrong: "ยังไม่ใช่", next: "ถัดไป", restart: "เริ่มใหม่", score: "คะแนน: {score}/{total}", done: "เสร็จ" },
    article: { keyPoints: "จุดสำคัญ", tips: "เคล็ดลับ", checklist: "เช็คลิสต์", expand: "ขยาย", collapse: "ย่อ" },
  },
  tr: {
    brand: { tagline: "Web3 bilgi altyapısı", badge: "Önce güvenlik" },
    nav: { explore: "Keşfet", ecosystem: "Ekosistem", news: "Haberler", chronicle: "Kronik", security: "Güvenlik", glossary: "Sözlük" },
    hero: { kicker: "8 KATMAN · ÖĞRENMEK İÇİN DOKUN", titleLine1: "İnternet değişiyor.", titleLine2: "Sonrakini haritala.", subtitle: "Web3 ağları ve fikirler — abartısız netlik.", ctaPrimary: "Ekosistemi keşfet", ctaSecondary: "Güvenlik merkezi", pause: "Duraklat", play: "Oynat" },
    sections: { ecosystem: "01 · EKOSİSTEM", ecosystemTitle: "Kategoriye göre keşfet", ecosystemDesc: "Web3'ün sekiz katmanı.", openExplorer: "Gezgini aç", news: "02 · SİNYAL", newsTitle: "Neler hareket ediyor", newsDesc: "Seçilmiş başlıklar.", allHeadlines: "Tüm başlıklar", glossary: "03 · SÖZLÜK", glossaryTitle: "Aynı dili konuş", glossaryDesc: "Hızlı tanımlar.", openGlossary: "Sözlüğü aç", security: "04 · SAVUNMA", securityTitle: "Hacklenmesi zor ol", securityDesc: "Oltalama, onay, tohum.", securityCenter: "Güvenlik merkezi", chronicle: "05 · ZAMAN ÇİZELGESİ", chronicleTitle: "Buraya nasıl geldik", chronicleDesc: "Whitepaper'dan ETF'ye.", fullChronicle: "Tam kronik", quiz: "06 · MEYDAN OKUMA", quizTitle: "Bilgini test et", quizDesc: "On soru.", startQuiz: "Başla", shuffle: "Karıştır" },
    common: { readMore: "Devamını oku", back: "Geri", search: "Ara", items: "öğe", minRead: "{m} dk", language: "Dil", followIp: "Dil bölgenizi (IP) takip eder.", fallbackNote: "Yerelleştirilmiş içerik.", noResults: "Sonuç yok.", useful: "Yararlı", useIpLanguage: "IP dilini kullan", ipActive: "aktif", manualOverride: "Manuel" },
    ecosystemPage: { title: "Ekosistem gezgini", subtitle: "Sekiz katman." },
    newsPage: { title: "Sinyal masası", subtitle: "Web3 başlıkları." },
    chroniclePage: { title: "Kronik", subtitle: "Dijital parayı değiştiren anlar." },
    securityPage: { title: "Güvenlik merkezi", subtitle: "Pratik savunmalar." },
    glossaryPage: { title: "Sözlük", subtitle: "Net tanımlar.", placeholder: "Filtrele…" },
    quiz: { correct: "Doğru", wrong: "Pek değil", next: "İleri", restart: "Yeniden", score: "Skor: {score}/{total}", done: "Bitti" },
    article: { keyPoints: "Ana noktalar", tips: "Pratik ipuçları", checklist: "Kontrol listesi", expand: "Genişlet", collapse: "Daralt" },
  },
  it: {
    brand: { tagline: "Infrastruttura di conoscenza Web3", badge: "Sicurezza prima" },
    nav: { explore: "Esplora", ecosystem: "Ecosistema", news: "Notizie", chronicle: "Cronaca", security: "Sicurezza", glossary: "Glossario" },
    hero: { kicker: "8 LIVELLI · TOCCA PER IMPARARE", titleLine1: "Internet sta cambiando.", titleLine2: "Mappa ciò che arriva.", subtitle: "Reti e idee Web3 — chiarezza, non hype.", ctaPrimary: "Esplora ecosistema", ctaSecondary: "Centro sicurezza", pause: "Pausa", play: "Play" },
    sections: { ecosystem: "01 · ECOSISTEMA", ecosystemTitle: "Esplora per categoria", ecosystemDesc: "Otto livelli di Web3.", openExplorer: "Apri explorer", news: "02 · SEGNALE", newsTitle: "Cosa si muove", newsDesc: "Titoli curati.", allHeadlines: "Tutti i titoli", glossary: "03 · LESSICO", glossaryTitle: "Parla la stessa lingua", glossaryDesc: "Definizioni rapide.", openGlossary: "Apri glossario", security: "04 · DIFESA", securityTitle: "Resta difficile da hackerare", securityDesc: "Phishing, approve, seed.", securityCenter: "Centro sicurezza", chronicle: "05 · TIMELINE", chronicleTitle: "Come siamo arrivati qui", chronicleDesc: "Dal whitepaper agli ETF.", fullChronicle: "Cronaca completa", quiz: "06 · SFIDA", quizTitle: "Metti alla prova le conoscenze", quizDesc: "Dieci domande.", startQuiz: "Inizia", shuffle: "Mescola" },
    common: { readMore: "Leggi di più", back: "Indietro", search: "Cerca", items: "elementi", minRead: "{m} min", language: "Lingua", followIp: "La lingua segue la tua regione (IP).", fallbackNote: "Contenuto localizzato.", noResults: "Nessun risultato.", useful: "Utile", useIpLanguage: "Usa lingua IP", ipActive: "attivo", manualOverride: "Manuale" },
    ecosystemPage: { title: "Explorer ecosistema", subtitle: "Otto livelli." },
    newsPage: { title: "Desk segnali", subtitle: "Titoli Web3." },
    chroniclePage: { title: "Cronaca", subtitle: "Momenti che hanno cambiato il denaro digitale." },
    securityPage: { title: "Centro sicurezza", subtitle: "Difese pratiche." },
    glossaryPage: { title: "Glossario", subtitle: "Definizioni chiare.", placeholder: "Filtra…" },
    quiz: { correct: "Corretto", wrong: "Quasi", next: "Avanti", restart: "Ricomincia", score: "Punteggio: {score}/{total}", done: "Completato" },
    article: { keyPoints: "Punti chiave", tips: "Suggerimenti pratici", checklist: "Checklist", expand: "Espandi", collapse: "Comprimi" },
  },
  nl: {
    brand: { tagline: "Web3-kennisinfrastructuur", badge: "Veiligheid eerst" },
    nav: { explore: "Verkennen", ecosystem: "Ecosysteem", news: "Nieuws", chronicle: "Kroniek", security: "Beveiliging", glossary: "Woordenlijst" },
    hero: { kicker: "8 LAGEN · TIK OM TE LEREN", titleLine1: "Het internet verandert.", titleLine2: "Kaart wat volgt.", subtitle: "Web3-netwerken en ideeën — helder, zonder hype.", ctaPrimary: "Ecosysteem verkennen", ctaSecondary: "Beveiligingscentrum", pause: "Pauze", play: "Afspelen" },
    sections: { ecosystem: "01 · ECOSYSTEEM", ecosystemTitle: "Verken per categorie", ecosystemDesc: "Acht lagen van Web3.", openExplorer: "Open explorer", news: "02 · SIGNAAL", newsTitle: "Wat beweegt", newsDesc: "Geselecteerde koppen.", allHeadlines: "Alle koppen", glossary: "03 · LEXICON", glossaryTitle: "Spreek dezelfde taal", glossaryDesc: "Snelle definities.", openGlossary: "Open woordenlijst", security: "04 · VERDEDIGING", securityTitle: "Moeilijk te hacken", securityDesc: "Phishing, approve, seed.", securityCenter: "Beveiligingscentrum", chronicle: "05 · TIJDLIJN", chronicleTitle: "Hoe we hier kwamen", chronicleDesc: "Van whitepaper tot ETF.", fullChronicle: "Volledige kroniek", quiz: "06 · UITDAGING", quizTitle: "Test je kennis", quizDesc: "Tien vragen.", startQuiz: "Start", shuffle: "Shuffle" },
    common: { readMore: "Meer lezen", back: "Terug", search: "Zoeken", items: "items", minRead: "{m} min", language: "Taal", followIp: "Taal volgt je regio (IP).", fallbackNote: "Gelokaliseerde inhoud.", noResults: "Geen resultaten.", useful: "Nuttig", useIpLanguage: "IP-taal gebruiken", ipActive: "actief", manualOverride: "Handmatig" },
    ecosystemPage: { title: "Ecosysteemverkenner", subtitle: "Acht lagen." },
    newsPage: { title: "Signaaldesk", subtitle: "Web3-koppen." },
    chroniclePage: { title: "Kroniek", subtitle: "Momenten die digitaal geld vormden." },
    securityPage: { title: "Beveiligingscentrum", subtitle: "Praktische verdediging." },
    glossaryPage: { title: "Woordenlijst", subtitle: "Duidelijke definities.", placeholder: "Filter…" },
    quiz: { correct: "Juist", wrong: "Bijna", next: "Volgende", restart: "Opnieuw", score: "Score: {score}/{total}", done: "Klaar" },
    article: { keyPoints: "Kernpunten", tips: "Praktische tips", checklist: "Checklist", expand: "Uitklappen", collapse: "Inklappen" },
  },
  pl: {
    brand: { tagline: "Infrastruktura wiedzy Web3", badge: "Najpierw bezpieczeństwo" },
    nav: { explore: "Odkrywaj", ecosystem: "Ekosystem", news: "Aktualności", chronicle: "Kronika", security: "Bezpieczeństwo", glossary: "Słownik" },
    hero: { kicker: "8 WARSTW · DOTKNIJ, BY UCZYĆ SIĘ", titleLine1: "Internet się zmienia.", titleLine2: "Zmapuj to, co dalej.", subtitle: "Sieci i idee Web3 — jasno, bez hype'u.", ctaPrimary: "Przeglądaj ekosystem", ctaSecondary: "Centrum bezpieczeństwa", pause: "Pauza", play: "Odtwórz" },
    sections: { ecosystem: "01 · EKOSYSTEM", ecosystemTitle: "Przeglądaj kategorie", ecosystemDesc: "Osiem warstw Web3.", openExplorer: "Otwórz eksplorator", news: "02 · SYGNAŁ", newsTitle: "Co się dzieje", newsDesc: "Wybrane nagłówki.", allHeadlines: "Wszystkie nagłówki", glossary: "03 · LEKSYKON", glossaryTitle: "Mów tym samym językiem", glossaryDesc: "Szybkie definicje.", openGlossary: "Otwórz słownik", security: "04 · OBRONA", securityTitle: "Bądź trudny do zhackowania", securityDesc: "Phishing, approve, seed.", securityCenter: "Centrum bezpieczeństwa", chronicle: "05 · OSI CZASU", chronicleTitle: "Jak tu trafiliśmy", chronicleDesc: "Od whitepapera do ETF.", fullChronicle: "Pełna kronika", quiz: "06 · WYZWANIE", quizTitle: "Sprawdź wiedzę", quizDesc: "Dziesięć pytań.", startQuiz: "Start", shuffle: "Losuj" },
    common: { readMore: "Czytaj więcej", back: "Wstecz", search: "Szukaj", items: "pozycji", minRead: "{m} min", language: "Język", followIp: "Język podąża za regionem (IP).", fallbackNote: "Treść zlokalizowana.", noResults: "Brak wyników.", useful: "Przydatne", useIpLanguage: "Użyj języka IP", ipActive: "aktywne", manualOverride: "Ręcznie" },
    ecosystemPage: { title: "Eksplorator ekosystemu", subtitle: "Osiem warstw." },
    newsPage: { title: "Biurko sygnałów", subtitle: "Nagłówki Web3." },
    chroniclePage: { title: "Kronika", subtitle: "Momenty, które zmieniły cyfrowe pieniądze." },
    securityPage: { title: "Centrum bezpieczeństwa", subtitle: "Praktyczna obrona." },
    glossaryPage: { title: "Słownik", subtitle: "Jasne definicje.", placeholder: "Filtruj…" },
    quiz: { correct: "Poprawnie", wrong: "Niezupełnie", next: "Dalej", restart: "Od nowa", score: "Wynik: {score}/{total}", done: "Gotowe" },
    article: { keyPoints: "Kluczowe punkty", tips: "Praktyczne wskazówki", checklist: "Checklist", expand: "Rozwiń", collapse: "Zwiń" },
  },
  uk: {
    brand: { tagline: "Інфраструктура знань Web3", badge: "Спочатку безпека" },
    nav: { explore: "Огляд", ecosystem: "Екосистема", news: "Новини", chronicle: "Хроніка", security: "Безпека", glossary: "Глосарій" },
    hero: { kicker: "8 ШАРІВ · НАТИСНІТЬ, ЩОБ ВЧИТИСЯ", titleLine1: "Інтернет змінюється.", titleLine2: "Намалюйте наступне.", subtitle: "Мережі та ідеї Web3 — без хайпу.", ctaPrimary: "Відкрити екосистему", ctaSecondary: "Центр безпеки", pause: "Пауза", play: "Відтворити" },
    sections: { ecosystem: "01 · ЕКОСИСТЕМА", ecosystemTitle: "За категоріями", ecosystemDesc: "Вісім шарів Web3.", openExplorer: "Відкрити", news: "02 · СИГНАЛ", newsTitle: "Що рухається", newsDesc: "Добірка заголовків.", allHeadlines: "Усі заголовки", glossary: "03 · ЛЕКСИКОН", glossaryTitle: "Говоріть однією мовою", glossaryDesc: "Швидкі визначення.", openGlossary: "Відкрити глосарій", security: "04 · ЗАХИСТ", securityTitle: "Станьте складнішими для злому", securityDesc: "Фішинг, approve, seed.", securityCenter: "Центр безпеки", chronicle: "05 · ТАЙМЛАЙН", chronicleTitle: "Як ми сюди потрапили", chronicleDesc: "Від whitepaper до ETF.", fullChronicle: "Повна хроніка", quiz: "06 · ВИКЛИК", quizTitle: "Перевірте знання", quizDesc: "Десять питань.", startQuiz: "Почати", shuffle: "Перемішати" },
    common: { readMore: "Читати далі", back: "Назад", search: "Пошук", items: "ел.", minRead: "{m} хв", language: "Мова", followIp: "Мова слідує за регіоном (IP).", fallbackNote: "Локалізований вміст.", noResults: "Немає збігів.", useful: "Корисно", useIpLanguage: "Мова за IP", ipActive: "активно", manualOverride: "Вручну" },
    ecosystemPage: { title: "Огляд екосистеми", subtitle: "Вісім шарів." },
    newsPage: { title: "Сигнальний стіл", subtitle: "Заголовки Web3." },
    chroniclePage: { title: "Хроніка", subtitle: "Моменти, що змінили цифрові гроші." },
    securityPage: { title: "Центр безпеки", subtitle: "Практичний захист." },
    glossaryPage: { title: "Глосарій", subtitle: "Зрозумілі визначення.", placeholder: "Фільтр…" },
    quiz: { correct: "Правильно", wrong: "Не зовсім", next: "Далі", restart: "Знову", score: "Рахунок: {score}/{total}", done: "Готово" },
    article: { keyPoints: "Ключові пункти", tips: "Практичні поради", checklist: "Чекліст", expand: "Розгорнути", collapse: "Згорнути" },
  },
  ms: {
    brand: { tagline: "Infrastruktur pengetahuan Web3", badge: "Keselamatan dahulu" },
    nav: { explore: "Jelajah", ecosystem: "Ekosistem", news: "Berita", chronicle: "Kronikel", security: "Keselamatan", glossary: "Glosari" },
    hero: { kicker: "8 LAPISAN · KETIK UNTUK BELAJAR", titleLine1: "Internet sedang berubah.", titleLine2: "Petakan apa seterusnya.", subtitle: "Rangkaian dan idea Web3 — jelas, tanpa hype.", ctaPrimary: "Jelajah ekosistem", ctaSecondary: "Pusat keselamatan", pause: "Jeda", play: "Main" },
    sections: { ecosystem: "01 · EKOSISTEM", ecosystemTitle: "Jelajah mengikut kategori", ecosystemDesc: "Lapan lapisan Web3.", openExplorer: "Buka explorer", news: "02 · ISYARAT", newsTitle: "Apa yang bergerak", newsDesc: "Tajuk terpilih.", allHeadlines: "Semua tajuk", glossary: "03 · LEKSIKON", glossaryTitle: "Cakap bahasa sama", glossaryDesc: "Takrif pantas.", openGlossary: "Buka glosari", security: "04 · PERTAHANAN", securityTitle: "Sukar dihack", securityDesc: "Phishing, approve, seed.", securityCenter: "Pusat keselamatan", chronicle: "05 · GARIS MASA", chronicleTitle: "Bagaimana kita sampai sini", chronicleDesc: "Dari whitepaper ke ETF.", fullChronicle: "Kronikel penuh", quiz: "06 · CABARAN", quizTitle: "Uji pengetahuan", quizDesc: "Sepuluh soalan.", startQuiz: "Mula", shuffle: "Kocok" },
    common: { readMore: "Baca lagi", back: "Kembali", search: "Cari", items: "item", minRead: "{m} min", language: "Bahasa", followIp: "Bahasa mengikut wilayah (IP).", fallbackNote: "Kandungan dilokalkan.", noResults: "Tiada hasil.", useful: "Berguna", useIpLanguage: "Guna bahasa IP", ipActive: "aktif", manualOverride: "Manual" },
    ecosystemPage: { title: "Penjelajah ekosistem", subtitle: "Lapan lapisan." },
    newsPage: { title: "Meja isyarat", subtitle: "Tajuk Web3." },
    chroniclePage: { title: "Kronikel", subtitle: "Detik yang membentuk wang digital." },
    securityPage: { title: "Pusat keselamatan", subtitle: "Pertahanan praktikal." },
    glossaryPage: { title: "Glosari", subtitle: "Takrif jelas.", placeholder: "Tapis…" },
    quiz: { correct: "Betul", wrong: "Belum tepat", next: "Seterusnya", restart: "Semula", score: "Skor: {score}/{total}", done: "Selesai" },
    article: { keyPoints: "Perkara utama", tips: "Tip praktikal", checklist: "Senarai semak", expand: "Kembangkan", collapse: "Tutup" },
  },
  ro: {
    brand: { tagline: "Infrastructură de cunoștințe Web3", badge: "Mai întâi securitatea" },
    nav: { explore: "Explorează", ecosystem: "Ecosistem", news: "Știri", chronicle: "Cronică", security: "Securitate", glossary: "Glosar" },
    hero: { kicker: "8 STRATURI · ATINGE PENTRU A ÎNVĂȚA", titleLine1: "Internetul se schimbă.", titleLine2: "Cartografiază ce urmează.", subtitle: "Rețele și idei Web3 — clar, fără hype.", ctaPrimary: "Explorează ecosistemul", ctaSecondary: "Centru securitate", pause: "Pauză", play: "Redă" },
    sections: { ecosystem: "01 · ECOSISTEM", ecosystemTitle: "Explorează pe categorii", ecosystemDesc: "Opt straturi Web3.", openExplorer: "Deschide explorer", news: "02 · SEMNAL", newsTitle: "Ce se mișcă", newsDesc: "Titluri selectate.", allHeadlines: "Toate titlurile", glossary: "03 · LEXICON", glossaryTitle: "Vorbește aceeași limbă", glossaryDesc: "Definiții rapide.", openGlossary: "Deschide glosarul", security: "04 · APĂRARE", securityTitle: "Fii greu de spart", securityDesc: "Phishing, approve, seed.", securityCenter: "Centru securitate", chronicle: "05 · CRONOLOGIE", chronicleTitle: "Cum am ajuns aici", chronicleDesc: "De la whitepaper la ETF.", fullChronicle: "Cronică completă", quiz: "06 · PROVOCARE", quizTitle: "Testează-ți cunoștințele", quizDesc: "Zece întrebări.", startQuiz: "Începe", shuffle: "Amestecă" },
    common: { readMore: "Citește mai mult", back: "Înapoi", search: "Caută", items: "elemente", minRead: "{m} min", language: "Limbă", followIp: "Limba urmează regiunea (IP).", fallbackNote: "Conținut localizat.", noResults: "Niciun rezultat.", useful: "Util", useIpLanguage: "Folosește limba IP", ipActive: "activ", manualOverride: "Manual" },
    ecosystemPage: { title: "Explorer ecosistem", subtitle: "Opt straturi." },
    newsPage: { title: "Birou semnale", subtitle: "Titluri Web3." },
    chroniclePage: { title: "Cronică", subtitle: "Momente care au remodelat banii digitali." },
    securityPage: { title: "Centru securitate", subtitle: "Apărări practice." },
    glossaryPage: { title: "Glosar", subtitle: "Definiții clare.", placeholder: "Filtrează…" },
    quiz: { correct: "Corect", wrong: "Aproape", next: "Următorul", restart: "Repornește", score: "Scor: {score}/{total}", done: "Gata" },
    article: { keyPoints: "Puncte cheie", tips: "Sfaturi practice", checklist: "Checklist", expand: "Extinde", collapse: "Restrânge" },
  },
};

function deepMerge(base, overlay) {
  const out = structuredClone(base);
  if (!overlay) return out;
  for (const [k, v] of Object.entries(overlay)) {
    if (v && typeof v === "object" && !Array.isArray(v)) out[k] = deepMerge(out[k] || {}, v);
    else out[k] = v;
  }
  return out;
}

/** For remaining locales, wrap English with localized nav/common essentials. */
const light = {
  bn: { nav: { explore: "অন্বেষণ", ecosystem: "ইকোসিস্টেম", news: "খবর", chronicle: "ইতিহাস", security: "নিরাপত্তা", glossary: "শব্দকোষ" }, common: { readMore: "আরও পড়ুন", back: "ফিরে যান", language: "ভাষা", useIpLanguage: "IP ভাষা ব্যবহার করুন", ipActive: "সক্রিয়", followIp: "ভাষা আপনার অঞ্চল (IP) অনুসরণ করে।" } },
  pa: { nav: { explore: "ਖੋਜੋ", ecosystem: "ਈਕੋਸਿਸਟਮ", news: "ਖਬਰਾਂ", chronicle: "ਇਤਿਹਾਸ", security: "ਸੁਰੱਖਿਆ", glossary: "ਸ਼ਬਦਾਵਲੀ" }, common: { readMore: "ਹੋਰ ਪੜ੍ਹੋ", back: "ਵਾਪਸ", language: "ਭਾਸ਼ਾ", useIpLanguage: "IP ਭਾਸ਼ਾ ਵਰਤੋ", ipActive: "ਸਰਗਰਮ", followIp: "ਭਾਸ਼ਾ ਤੁਹਾਡੇ ਖੇਤਰ (IP) ਦੀ ਪਾਲਣਾ ਕਰਦੀ ਹੈ।" } },
  jv: { nav: { explore: "Jelajah", ecosystem: "Ekosistem", news: "Warta", chronicle: "Babad", security: "Keamanan", glossary: "Glosarium" }, common: { readMore: "Waca liyane", back: "Bali", language: "Basa", useIpLanguage: "Gunakake basa IP", ipActive: "aktif", followIp: "Basa ngetutake wilayah (IP)." } },
  te: { nav: { explore: "అన్వేషించండి", ecosystem: "ఎకోసిస్టమ్", news: "వార్తలు", chronicle: "చరిత్ర", security: "భద్రత", glossary: "పదకోశం" }, common: { readMore: "మరిన్ని చదవండి", back: "వెనుకకు", language: "భాష", useIpLanguage: "IP భాష ఉపయోగించండి", ipActive: "సక్రియం", followIp: "భాష మీ ప్రాంతం (IP)ను అనుసరిస్తుంది." } },
  mr: { nav: { explore: "शोधा", ecosystem: "इकोसिस्टम", news: "बातम्या", chronicle: "इतिहास", security: "सुरक्षा", glossary: "शब्दकोश" }, common: { readMore: "अधिक वाचा", back: "मागे", language: "भाषा", useIpLanguage: "IP भाषा वापरा", ipActive: "सक्रिय", followIp: "भाषा तुमच्या प्रदेशाचे (IP) अनुसरण करते." } },
  ta: { nav: { explore: "ஆராய்க", ecosystem: "சூழல்மண்டலம்", news: "செய்திகள்", chronicle: "வரலாறு", security: "பாதுகாப்பு", glossary: "அகராதி" }, common: { readMore: "மேலும் படி", back: "பின்", language: "மொழி", useIpLanguage: "IP மொழியைப் பயன்படுத்து", ipActive: "செயலில்", followIp: "மொழி உங்கள் பகுதியை (IP) பின்பற்றும்." } },
  ur: { nav: { explore: "دریافت کریں", ecosystem: "ایکو سسٹم", news: "خبریں", chronicle: "تاریخ", security: "سیکیورٹی", glossary: "لغت" }, common: { readMore: "مزید پڑھیں", back: "واپس", language: "زبان", useIpLanguage: "IP زبان استعمال کریں", ipActive: "فعال", followIp: "زبان آپ کے علاقے (IP) کی پیروی کرتی ہے۔" } },
  gu: { nav: { explore: "શોધો", ecosystem: "ઇકોસિસ્ટમ", news: "સમાચાર", chronicle: "ઇતિહાસ", security: "સુરક્ષા", glossary: "શબ્દકોશ" }, common: { readMore: "વધુ વાંચો", back: "પાછળ", language: "ભાષા", useIpLanguage: "IP ભાષા વાપરો", ipActive: "સક્રિય", followIp: "ભાષા તમારા પ્રદેશ (IP)ને અનુસરે છે." } },
  kn: { nav: { explore: "ಅನ್ವೇಷಿಸಿ", ecosystem: "ಪರಿಸರ ವ್ಯವಸ್ಥೆ", news: "ಸುದ್ದಿ", chronicle: "ಇತಿಹಾಸ", security: "ಭದ್ರತೆ", glossary: "ಪದಕೋಶ" }, common: { readMore: "ಇನ್ನಷ್ಟು ಓದಿ", back: "ಹಿಂದೆ", language: "ಭಾಷೆ", useIpLanguage: "IP ಭಾಷೆ ಬಳಸಿ", ipActive: "ಸಕ್ರಿಯ", followIp: "ಭಾಷೆ ನಿಮ್ಮ ಪ್ರದೇಶವನ್ನು (IP) ಅನುಸರಿಸುತ್ತದೆ." } },
  fa: { nav: { explore: "کاوش", ecosystem: "اکوسیستم", news: "اخبار", chronicle: "گاه‌شمار", security: "امنیت", glossary: "واژه‌نامه" }, common: { readMore: "بیشتر بخوانید", back: "بازگشت", language: "زبان", useIpLanguage: "استفاده از زبان IP", ipActive: "فعال", followIp: "زبان از منطقه شما (IP) پیروی می‌کند." } },
  ml: { nav: { explore: "പരിശോധിക്കുക", ecosystem: "ആവാസവ്യവസ്ഥ", news: "വാർത്ത", chronicle: "ചരിത്രം", security: "സുരക്ഷ", glossary: "നിഘണ്ടു" }, common: { readMore: "കൂടുതൽ വായിക്കുക", back: "തിരികെ", language: "ഭാഷ", useIpLanguage: "IP ഭാഷ ഉപയോഗിക്കുക", ipActive: "സജീവം", followIp: "ഭാഷ നിങ്ങളുടെ മേഖലയെ (IP) പിന്തുടരുന്നു." } },
  or: { nav: { explore: "ଅନୁସନ୍ଧାନ", ecosystem: "ଇକୋସିଷ୍ଟମ୍", news: "ଖବର", chronicle: "ଇତିହାସ", security: "ସୁରକ୍ଷା", glossary: "ଶବ୍ଦକୋଷ" }, common: { readMore: "ଅଧିକ ପଢନ୍ତୁ", back: "ପଛକୁ", language: "ଭାଷା", useIpLanguage: "IP ଭାଷା ବ୍ୟବହାର କରନ୍ତୁ", ipActive: "ସକ୍ରିୟ", followIp: "ଭାଷା ଆପଣଙ୍କ ଅଞ୍ଚଳ (IP) ଅନୁସରଣ କରେ।" } },
  my: { nav: { explore: "ရှာဖွေရန်", ecosystem: "ဂေဟစနစ်", news: "သတင်း", chronicle: "မှတ်တမ်း", security: "လုံခြုံရေး", glossary: "အဘိဓာန်" }, common: { readMore: "ပိုမိုဖတ်ရန်", back: "နောက်သို့", language: "ဘာသာစကား", useIpLanguage: "IP ဘာသာသုံးရန်", ipActive: "ဖွင့်ထား", followIp: "ဘာသာစကားသည် သင့်ဒေသ (IP) ကိုလိုက်သည်။" } },
  sw: { nav: { explore: "Chunguza", ecosystem: "Ikolojia", news: "Habari", chronicle: "Historia", security: "Usalama", glossary: "Kamusi" }, common: { readMore: "Soma zaidi", back: "Rudi", language: "Lugha", useIpLanguage: "Tumia lugha ya IP", ipActive: "inatumika", followIp: "Lugha inafuata eneo lako (IP)." } },
  ha: { nav: { explore: "Bincika", ecosystem: "Tsarin rayuwa", news: "Labarai", chronicle: "Tarihi", security: "Tsaro", glossary: "Ƙamus" }, common: { readMore: "Kara karantawa", back: "Komawa", language: "Harshe", useIpLanguage: "Yi amfani da harshen IP", ipActive: "aiki", followIp: "Harshe yana bin yankinku (IP)." } },
};

const allLocales = [
  "zh","en","es","hi","ar","pt","bn","ru","ja","pa","de","jv","ko","fr","te","mr","tr","ta","vi","ur","it","th","gu","kn","fa","pl","uk","ml","or","my","nl","ro","id","ms","sw","ha",
];

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "en.json"), JSON.stringify(en, null, 2));
fs.writeFileSync(path.join(outDir, "zh.json"), JSON.stringify(zh, null, 2));

for (const locale of allLocales) {
  if (locale === "en" || locale === "zh") continue;
  let data = deepMerge(en, packs[locale] || {});
  if (light[locale]) data = deepMerge(data, light[locale]);
  // ensure IP keys always exist
  data.common.useIpLanguage = data.common.useIpLanguage || en.common.useIpLanguage;
  data.common.ipActive = data.common.ipActive || en.common.ipActive;
  data.common.manualOverride = data.common.manualOverride || en.common.manualOverride;
  fs.writeFileSync(path.join(outDir, `${locale}.json`), JSON.stringify(data, null, 2));
}

console.log(`UI messages written for ${allLocales.length} locales`);
