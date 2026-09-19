import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import pypdf

pdf_filename = r'c:\Users\GuruPrasad\Downloads\guruprasad-g\reume\Guruprasad_G.pdf'
public_pdf_filename = r'c:\Users\GuruPrasad\Downloads\guruprasad-g\public\reume\Guruprasad_G.pdf'

os.makedirs(r'c:\Users\GuruPrasad\Downloads\guruprasad-g\reume', exist_ok=True)
os.makedirs(r'c:\Users\GuruPrasad\Downloads\guruprasad-g\public\reume', exist_ok=True)

doc = SimpleDocTemplate(
    pdf_filename,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=28,
    bottomMargin=28
)

styles = getSampleStyleSheet()

# Custom typography & styles
name_style = ParagraphStyle(
    'DocName',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=20,
    textColor=colors.HexColor('#0F172A'),
    alignment=1
)

sub_title_style = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=12,
    textColor=colors.HexColor('#2563EB'),
    alignment=1
)

contact_style = ParagraphStyle(
    'DocContact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    textColor=colors.HexColor('#475569'),
    alignment=1
)

sec_title_style = ParagraphStyle(
    'DocSecTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=12,
    textColor=colors.HexColor('#1E293B'),
    spaceAfter=2
)

body_style = ParagraphStyle(
    'DocBody',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.2,
    textColor=colors.HexColor('#334155')
)

bullet_style = ParagraphStyle(
    'DocBullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.3,
    leading=11,
    textColor=colors.HexColor('#334155'),
    leftIndent=8,
    spaceAfter=2
)

bold_label = ParagraphStyle(
    'DocBoldLabel',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11.2,
    textColor=colors.HexColor('#0F172A')
)

story = []

# 1. Header Section
story.append(Paragraph('GURUPRASAD G', name_style))
story.append(Spacer(1, 2))
story.append(Paragraph('Software Engineer | Frontend Developer | Full-Stack Developer', sub_title_style))
story.append(Spacer(1, 2))
contact_line = '+91 8951657957 &nbsp;|&nbsp; guruprasas27@gmail.com &nbsp;|&nbsp; Ballari, Karnataka &nbsp;|&nbsp; github.com/GuruPrasad403 &nbsp;|&nbsp; guruprasad-g-one.vercel.app'
story.append(Paragraph(contact_line, contact_style))
story.append(Spacer(1, 4))

def make_sec_header(title):
    return [
        Paragraph(f'<b>{title.upper()}</b>', sec_title_style),
        Table([['']], colWidths=[540], rowHeights=[1], style=TableStyle([
            ('LINEABOVE', (0,0), (-1,-1), 0.8, colors.HexColor('#2563EB')),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ])),
        Spacer(1, 3)
    ]

# 2. Professional Summary
story.extend(make_sec_header('Professional Summary'))
summary_text = (
    "Software Engineer with professional experience at <b>Indegene</b> in enterprise web development, Adobe Experience Manager (AEM), "
    "and full-stack React/Node.js ecosystems. Converted from Apprentice to full-time Software Engineer. Appointed as <b>AI Champion</b> "
    "at Indegene, driving AI tool adoption (GitHub Copilot, ROVO) across 30+ team members to enhance engineering workflows. "
    "Hands-on experience building performant applications using React.js, TypeScript, Node.js, Express, MongoDB, REST APIs, JWT authentication, and NLP techniques."
)
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 5))

# 3. Technical Skills
story.extend(make_sec_header('Technical Skills'))
skills_data = [
    [Paragraph('<b>Frontend:</b>', bold_label), Paragraph('HTML5, CSS3, JavaScript (ES6+), React.js, TypeScript, Tailwind CSS, Responsive Design, Flexbox', body_style)],
    [Paragraph('<b>Backend &amp; DB:</b>', bold_label), Paragraph('Node.js, Express.js, REST APIs, MongoDB, JWT Authentication', body_style)],
    [Paragraph('<b>Enterprise CMS:</b>', bold_label), Paragraph('Adobe Experience Manager (AEM), Component Authoring, CMS Workflows', body_style)],
    [Paragraph('<b>AI &amp; Tools:</b>', bold_label), Paragraph('GitHub Copilot, ROVO, Generative AI, NLP, Git/GitHub, VS Code, Troubleshooting &amp; Debugging', body_style)],
    [Paragraph('<b>Languages:</b>', bold_label), Paragraph('JavaScript, TypeScript, Python, C', body_style)],
]
t_skills = Table(skills_data, colWidths=[85, 455])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('TOPPADDING', (0,0), (-1,-1), 0.8),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0.8),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_skills)
story.append(Spacer(1, 5))

# 4. Professional Experience
story.extend(make_sec_header('Professional Experience'))

# Indegene
exp1_header = [
    [Paragraph('<b>Web Developer &amp; AI Champion</b> | Indegene Limited', bold_label), Paragraph('<font color="#2563EB"><b>Sep 2025 – Present</b></font>', ParagraphStyle('RAlign', parent=bold_label, alignment=2))]
]
t_exp1 = Table(exp1_header, colWidths=[380, 160])
t_exp1.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(t_exp1)
story.append(Spacer(1, 2))

bullets_exp1 = [
    "Converted from Web Developer Apprentice/Trainee to full-time Software Engineer at Indegene based on performance.",
    "Develop responsive web pages, splash pages, HCP portals, and reusable components using HTML5, CSS3, JavaScript, and React.",
    "Build and maintain enterprise web experiences on Adobe Experience Manager (AEM), adhering to strict CMS workflows.",
    "Appointed as AI Champion alongside core engineering duties; guide 30+ employees monthly in discovering AI use cases with Copilot &amp; ROVO.",
    "Troubleshoot UI rendering issues, execute cross-browser compatibility tests, and review peer code quality."
]
for b in bullets_exp1:
    story.append(Paragraph(f'• {b}', bullet_style))
story.append(Spacer(1, 4))

# Digitide Solutions
exp2_header = [
    [Paragraph('<b>Customer Care Executive → SME</b> | Digitide Solutions Limited', bold_label), Paragraph('<font color="#2563EB"><b>Jun 2024 – Sep 2025</b></font>', ParagraphStyle('RAlign2', parent=bold_label, alignment=2))]
]
t_exp2 = Table(exp2_header, colWidths=[380, 160])
t_exp2.setStyle(TableStyle([('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0), ('BOTTOMPADDING', (0,0), (-1,-1), 0)]))
story.append(t_exp2)
story.append(Spacer(1, 2))

bullets_exp2 = [
    "Promoted to Subject Matter Expert (SME) within 3 months based on high performance and exceptional product knowledge.",
    "Resolved 50+ customer queries daily maintaining a 95% satisfaction rating; mentored 4 training batches with 100% pass rate."
]
for b in bullets_exp2:
    story.append(Paragraph(f'• {b}', bullet_style))
story.append(Spacer(1, 5))

# 5. Key Projects & Internship
story.extend(make_sec_header('Key Projects &amp; Internship'))

proj1 = "<b>Second Brain</b> (PWA) | <i>React.js, Node.js, Express, MongoDB, TypeScript, NLP</i>"
story.append(Paragraph(proj1, bold_label))
story.append(Paragraph("• Built a full-stack progressive knowledge app with semantic search, REST APIs, tag categorization, and JWT auth.", bullet_style))
story.append(Spacer(1, 2))

proj2 = "<b>WealthFlow Expense Tracker</b> | <i>React.js, Node.js, Express, MongoDB, Tailwind CSS</i>"
story.append(Paragraph(proj2, bold_label))
story.append(Paragraph("• Developed financial budgeting app with interactive visual data, mobile-first CSS Flexbox, and MongoDB persistence.", bullet_style))
story.append(Spacer(1, 2))

proj3 = "<b>CareBot Medical Assistant</b> | <i>Python, NLP, Generative AI (Aptpath Internship - Nov 2024)</i>"
story.append(Paragraph(proj3, bold_label))
story.append(Paragraph("• Created an AI chatbot for medical query processing, context-aware answers, and intelligent resource recommendations.", bullet_style))
story.append(Spacer(1, 5))

# 6. Education & Key Achievements
story.extend(make_sec_header('Education &amp; Key Achievements'))
edu_grid = [
    [
        Paragraph('<b>Bachelor of Computer Applications (BCA)</b><br/>Shree Medha Degree College (VSKU) | <font color="#475569">2022 – 2025</font><br/>• Concurrent Full-Time CCE at Digitide Solutions during BCA<br/>• Coordinated campus events with peers and faculty', body_style),
        Paragraph('<b>Hackathons &amp; Certifications:</b><br/>• 2nd Runner Up (₹10,000 Prize) - HACKB24 (BITM)<br/>• Vidyaloop Creator - BGSCET National Level Hackathon<br/>• 0-to-100 Online Hackathon Platform Builder<br/>• Full Stack Developer Certification (100xDevs)', body_style)
    ]
]
t_edu = Table(edu_grid, colWidths=[270, 270])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ('TOPPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_edu)

doc.build(story)
shutil.copyfile(pdf_filename, public_pdf_filename)

reader = pypdf.PdfReader(pdf_filename)
print('PDF generation complete. Total pages:', len(reader.pages))
