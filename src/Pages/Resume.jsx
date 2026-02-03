import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class Resume extends Component {
    constructor() {
        super();
        this.state = {
            exporting: false
        };
        this.resumeRef = React.createRef();
    }

    handleDownloadPDF = async () => {
        this.setState({ exporting: true });
        try {
            const element = this.resumeRef.current;
            if (!element) return;

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Resume.pdf');
        } catch (err) {
            console.error('Failed to export PDF:', err);
        } finally {
            this.setState({ exporting: false });
        }
    };

    render() {
        const { resumeData } = this.props;
        const { exporting } = this.state;

        if (!resumeData) {
            return null;
        }

        const {
            fullName,
            location,
            phone,
            email,
            website,
            summary,
            skills,
            experience,
            education,
            certifications
        } = resumeData;

        return (
            <section id="resume" className="resume-section">
                <div className="resume-section__header">
                    <h2 className="resume-section__title">Resume</h2>
                    <button 
                        className="resume-section__download-btn"
                        onClick={this.handleDownloadPDF}
                        disabled={exporting}
                    >
                        {exporting ? 'Generating PDF...' : 'Download PDF'}
                    </button>
                </div>

                <div className="resume-section__content" ref={this.resumeRef}>
                    <div className="resume-preview-public">
                        <div className="resume-preview-public__header">
                            <h1 className="resume-preview-public__name">{fullName || 'Your Name'}</h1>
                            <div className="resume-preview-public__contact">
                                {location && <span>{location}</span>}
                                {phone && <span>{phone}</span>}
                                {email && <span>{email}</span>}
                                {website && <span>{website}</span>}
                            </div>
                        </div>

                        {summary && (
                            <div className="resume-preview-public__section">
                                <h2>SUMMARY</h2>
                                <div dangerouslySetInnerHTML={{ __html: summary }} />
                            </div>
                        )}

                        {skills && skills.length > 0 && (
                            <div className="resume-preview-public__section">
                                <h2>SKILLS</h2>
                                <ul className="resume-preview-public__skills">
                                    {skills.filter(s => s).map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {experience && experience.length > 0 && (
                            <div className="resume-preview-public__section">
                                <h2>EXPERIENCE</h2>
                                {experience.map((exp, index) => (
                                    <div key={index} className="resume-preview-public__experience">
                                        <div className="resume-preview-public__exp-header">
                                            <div>
                                                <strong>{exp.title}</strong>
                                                {exp.company && <span> in {exp.company}</span>}
                                                {exp.location && <span> | {exp.location}</span>}
                                            </div>
                                            {exp.period && <span className="resume-preview-public__period">{exp.period}</span>}
                                        </div>
                                        {exp.description && (
                                            <div dangerouslySetInnerHTML={{ __html: exp.description }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {education && education.length > 0 && (
                            <div className="resume-preview-public__section">
                                <h2>EDUCATION</h2>
                                {education.map((edu, index) => (
                                    <div key={index} className="resume-preview-public__education">
                                        <div className="resume-preview-public__edu-header">
                                            <div>
                                                <strong>{edu.degree}</strong>
                                                {edu.field && <span> | {edu.field}</span>}
                                            </div>
                                            {edu.year && <span className="resume-preview-public__year">{edu.year}</span>}
                                        </div>
                                        {edu.institution && <div className="resume-preview-public__institution">{edu.institution}</div>}
                                        {edu.achievements && (
                                            <div dangerouslySetInnerHTML={{ __html: edu.achievements }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {certifications && certifications.length > 0 && (
                            <div className="resume-preview-public__section">
                                <h2>CERTIFICATIONS</h2>
                                <ul className="resume-preview-public__certifications">
                                    {certifications.filter(c => c).map((cert, index) => (
                                        <li key={index}>{cert}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default Resume;
