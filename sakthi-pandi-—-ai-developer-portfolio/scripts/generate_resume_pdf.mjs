import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function createResume() {
  const pdfDoc = await PDFDocument.create();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Standard A4 dimensions in points: 595.28 x 841.89
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const MARGIN_LEFT = 54;
  const MARGIN_RIGHT = 54;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

  const colorBlack = rgb(0.08, 0.08, 0.08);
  const colorDarkGray = rgb(0.18, 0.18, 0.18);
  const colorLine = rgb(0.82, 0.82, 0.82);
  const colorBoxLine = rgb(0.85, 0.85, 0.85);

  // Helper function to draw wrapped text
  function drawWrappedText(page, text, x, y, width, fontSize, font, color, lineHeight = 1.38) {
    const words = text.split(' ');
    let currentLine = '';
    let currentY = y;
    const lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > width && currentLine) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    for (const line of lines) {
      page.drawText(line, {
        x,
        y: currentY,
        size: fontSize,
        font,
        color,
      });
      currentY -= fontSize * lineHeight;
    }

    return currentY;
  }

  // Draw full-width horizontal divider line
  function drawDivider(page, y) {
    page.drawLine({
      start: { x: MARGIN_LEFT, y },
      end: { x: PAGE_WIDTH - MARGIN_RIGHT, y },
      thickness: 0.65,
      color: colorLine,
    });
    return y - 18;
  }

  // Draw section heading
  function drawSectionHeading(page, title, y) {
    page.drawText(title, {
      x: MARGIN_LEFT,
      y,
      size: 11,
      font: fontBold,
      color: colorBlack,
    });
    return y - 14;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  const page1 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y1 = PAGE_HEIGHT - 65;

  // Header: Name
  const nameText = 'SAKTHIPANDI M';
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 20);
  page1.drawText(nameText, {
    x: (PAGE_WIDTH - nameWidth) / 2,
    y: y1,
    size: 20,
    font: fontBold,
    color: colorBlack,
  });
  y1 -= 20;

  // Subtitle
  const subTitle = 'AI & ML DEVELOPER';
  const subTitleWidth = fontRegular.widthOfTextAtSize(subTitle, 10.5);
  page1.drawText(subTitle, {
    x: (PAGE_WIDTH - subTitleWidth) / 2,
    y: y1,
    size: 10.5,
    font: fontRegular,
    color: colorBlack,
  });
  y1 -= 26;

  // Contact Info Box
  const contactText = '+91 9884957854 | sakthipandi.official@gmail.com | linkedin.com/in/sakthi-pandi-1411h | https://github.com/SAKTHIPANDI-M';
  const contactFontSize = 8.3;
  const contactWidth = fontRegular.widthOfTextAtSize(contactText, contactFontSize);
  const boxPaddingX = 14;
  const boxWidth = Math.min(CONTENT_WIDTH, contactWidth + boxPaddingX * 2);
  const boxHeight = 22;
  const boxX = (PAGE_WIDTH - boxWidth) / 2;
  const boxY = y1 - 16;

  // Draw thin border box around contact
  page1.drawRectangle({
    x: boxX,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    borderWidth: 0.6,
    borderColor: colorBoxLine,
    color: undefined,
  });

  page1.drawText(contactText, {
    x: (PAGE_WIDTH - contactWidth) / 2,
    y: boxY + 7,
    size: contactFontSize,
    font: fontRegular,
    color: colorBlack,
  });

  y1 = boxY - 14;
  y1 = drawDivider(page1, y1);

  // CAREER OBJECTIVE
  y1 = drawSectionHeading(page1, 'CAREER OBJECTIVE', y1);
  const careerObjectiveText =
    'Motivated B.Sc. Computer Science with Artificial Intelligence student with a strong foundation in Python, Machine Learning, data analysis, and problem-solving. Seeking an opportunity to apply technical knowledge, contribute to AI-driven projects, and develop practical industry experience while continuously improving technical and professional skills.';
  y1 = drawWrappedText(page1, careerObjectiveText, MARGIN_LEFT, y1, CONTENT_WIDTH, 9.2, fontRegular, colorBlack, 1.4);
  y1 -= 8;

  y1 = drawDivider(page1, y1);

  // EDUCATION
  y1 = drawSectionHeading(page1, 'EDUCATION', y1);

  // Edu 1: S.I.V.E.T College
  page1.drawText('S.I.V.E.T College, Chennai', {
    x: MARGIN_LEFT,
    y: y1,
    size: 9.8,
    font: fontBold,
    color: colorBlack,
  });
  const date1 = '2024 – 2027';
  page1.drawText(date1, {
    x: PAGE_WIDTH - MARGIN_RIGHT - fontRegular.widthOfTextAtSize(date1, 9.5),
    y: y1,
    size: 9.5,
    font: fontRegular,
    color: colorBlack,
  });
  y1 -= 14;

  page1.drawText('Bachelor of Science – Computer Science with Artificial Intelligence (B.Sc CS AI)', {
    x: MARGIN_LEFT,
    y: y1,
    size: 9.2,
    font: fontRegular,
    color: colorBlack,
  });
  y1 -= 13;

  const edu1Desc = 'Currently studying in 3rd Year | CGPA: 8.3 | Developing strong foundations in programming, AI, and data science through coursework and hands-on academic projects.';
  y1 = drawWrappedText(page1, edu1Desc, MARGIN_LEFT, y1, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.38);
  y1 -= 12;

  // Edu 2: Madras Seva Sadan
  page1.drawText('Madras Seva Sadan Higher Secondary School, Chennai', {
    x: MARGIN_LEFT,
    y: y1,
    size: 9.8,
    font: fontBold,
    color: colorBlack,
  });
  const date2 = '2022 – 2024';
  page1.drawText(date2, {
    x: PAGE_WIDTH - MARGIN_RIGHT - fontRegular.widthOfTextAtSize(date2, 9.5),
    y: y1,
    size: 9.5,
    font: fontRegular,
    color: colorBlack,
  });
  y1 -= 14;

  page1.drawText('Higher Secondary Certificate (HSC) – Computer Science Stream', {
    x: MARGIN_LEFT,
    y: y1,
    size: 9.2,
    font: fontRegular,
    color: colorBlack,
  });
  y1 -= 13;

  const edu2Desc = 'Secured 60.33% | Completed core subjects in Computer Science, Mathematics, and Physics, establishing a solid academic base for higher studies.';
  y1 = drawWrappedText(page1, edu2Desc, MARGIN_LEFT, y1, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.38);
  y1 -= 8;

  y1 = drawDivider(page1, y1);

  // CERTIFICATIONS (First 4 items on Page 1)
  y1 = drawSectionHeading(page1, 'CERTIFICATIONS', y1);

  const certsPage1 = [
    '• Naan Mudhalvan – Front End Development Course | Government of Tamil Nadu initiative covering HTML, CSS, JavaScript, and responsive web design fundamentals.',
    '• IBM – Generative AI Course | Covered fundamentals of large language models, prompt engineering, and practical applications of generative AI technologies.',
    '• IBM – Data Analytics Course | Hands-on experience in data analysis, visualization, and interpretation using industry-relevant tools and methodologies.',
    '• Oracle – Front End Development Certification | Completed training in modern front-end development practices and web technologies.',
  ];

  for (const cert of certsPage1) {
    y1 = drawWrappedText(page1, cert, MARGIN_LEFT, y1, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.4);
    y1 -= 6;
  }

  // ==========================================
  // PAGE 2
  // ==========================================
  const page2 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y2 = PAGE_HEIGHT - 65;

  // Remaining 2 Certifications
  const certsPage2 = [
    '• IBM Developer Skills Network – Deep Learning Analytics | Issued by Star Systems (India) Private Limited, September 30, 2026.',
    '• GENCODARE’26 – Certificate of Participation | 24-Hour State-Level Hackathon, Agni College of Technology, September 25–26, 2026.',
  ];

  for (const cert of certsPage2) {
    y2 = drawWrappedText(page2, cert, MARGIN_LEFT, y2, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.4);
    y2 -= 6;
  }

  y2 -= 6;
  y2 = drawDivider(page2, y2);

  // EXPERIENCE
  y2 = drawSectionHeading(page2, 'EXPERIENCE', y2);
  const expText = '• Approtech R&D Solutions Pvt. Ltd. – AI Developer Intern | May 2026 – June 2026';
  y2 = drawWrappedText(page2, expText, MARGIN_LEFT, y2, CONTENT_WIDTH, 9.2, fontRegular, colorBlack, 1.38);
  y2 -= 8;

  y2 = drawDivider(page2, y2);

  // PROJECT (Singular "PROJECT" as on screenshot)
  y2 = drawSectionHeading(page2, 'PROJECT', y2);

  // Project 1: Heart Disease
  page2.drawText('Heart Disease Prediction Using Machine Learning', {
    x: MARGIN_LEFT,
    y: y2,
    size: 9.8,
    font: fontBold,
    color: colorBlack,
  });
  y2 -= 13;
  y2 = drawWrappedText(
    page2,
    'Developed a predictive model to identify the risk of heart disease using patient health data and classification algorithms.',
    MARGIN_LEFT,
    y2,
    CONTENT_WIDTH,
    9.0,
    fontRegular,
    colorBlack,
    1.38
  );
  y2 -= 10;

  // Project 2: FIFA World Cup
  page2.drawText('FIFA World Cup Winner Prediction', {
    x: MARGIN_LEFT,
    y: y2,
    size: 9.8,
    font: fontBold,
    color: colorBlack,
  });
  y2 -= 13;
  y2 = drawWrappedText(
    page2,
    'Built a machine learning model to predict FIFA World Cup winners using historical match statistics and team performance data.',
    MARGIN_LEFT,
    y2,
    CONTENT_WIDTH,
    9.0,
    fontRegular,
    colorBlack,
    1.38
  );
  y2 -= 10;

  // Project 3: Loan Approval
  page2.drawText('Loan Approval Prediction', {
    x: MARGIN_LEFT,
    y: y2,
    size: 9.8,
    font: fontBold,
    color: colorBlack,
  });
  y2 -= 13;
  y2 = drawWrappedText(
    page2,
    'Developed a prediction system to determine loan approval status based on applicant financial and demographic information using machine learning techniques.',
    MARGIN_LEFT,
    y2,
    CONTENT_WIDTH,
    9.0,
    fontRegular,
    colorBlack,
    1.38
  );
  y2 -= 12;

  // Tech Stack line
  page2.drawText('Tech Stack: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Jupyter Notebook.', {
    x: MARGIN_LEFT,
    y: y2,
    size: 9.2,
    font: fontBold,
    color: colorBlack,
  });
  y2 -= 14;

  y2 = drawDivider(page2, y2);

  // SKILLS
  y2 = drawSectionHeading(page2, 'SKILLS', y2);

  page2.drawText('Professional Skills', {
    x: MARGIN_LEFT,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  y2 -= 13;

  const profSkills = [
    '• Programming Languages: Python, Java, Prolog',
    '• Data Analysis & Visualization: Pandas, NumPy, Matplotlib',
    '• Web Technologies: HTML, CSS, Javascript',
    '• Tools & Platforms: PowerPoint, GitHub, IBM watsonx, Vercel, Supabace',
    '• Machine Learning: Scikit-learn',
  ];

  for (const s of profSkills) {
    y2 = drawWrappedText(page2, s, MARGIN_LEFT, y2, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.38);
    y2 -= 3;
  }
  y2 -= 7;

  page2.drawText('Personal Skills', {
    x: MARGIN_LEFT,
    y: y2,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  y2 -= 13;

  const personalSkillsPage2 = [
    '• Leadership',
    '• Team Collaboration',
  ];

  for (const p of personalSkillsPage2) {
    y2 = drawWrappedText(page2, p, MARGIN_LEFT, y2, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.38);
    y2 -= 3;
  }

  // ==========================================
  // PAGE 3
  // ==========================================
  const page3 = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y3 = PAGE_HEIGHT - 65;

  const personalSkillsPage3 = [
    '• Communication Skills',
    '• Problem Solving',
  ];

  for (const p of personalSkillsPage3) {
    y3 = drawWrappedText(page3, p, MARGIN_LEFT, y3, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.38);
    y3 -= 3;
  }

  y3 -= 8;
  y3 = drawDivider(page3, y3);

  // LANGUAGES
  y3 = drawSectionHeading(page3, 'LANGUAGES', y3);

  const languages = [
    '• Tamil',
    '• English',
  ];

  for (const l of languages) {
    y3 = drawWrappedText(page3, l, MARGIN_LEFT, y3, CONTENT_WIDTH, 9.0, fontRegular, colorBlack, 1.38);
    y3 -= 4;
  }

  const pdfBytes = await pdfDoc.save();

  const outputPath = path.resolve('public/Sakthipandi_M_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume PDF successfully written to ${outputPath} (${pdfBytes.length} bytes, 3 pages)`);
}

createResume().catch((err) => {
  console.error('Error generating resume PDF:', err);
  process.exit(1);
});
