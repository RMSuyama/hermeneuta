import React from 'react';
import { Clock, DollarSign, User, BookOpen, Star } from 'lucide-react';
import { mockCourses } from '../data/mockCourses';

const CoursesFeed = () => {
    return (
        <div className="courses-feed fade-in">
            <div className="section-header">
                <span className="section-subtitle">Educação Continuada</span>
                <h2 className="section-title">Cursos Jurídicos</h2>
                <div className="section-line"></div>
                <p className="section-desc">
                    Aprimore suas habilidades com nossa seleção de cursos focados na prática e inovação jurídica.
                </p>
            </div>

            <div className="courses-grid">
                {mockCourses.map((course) => (
                    <div key={course.id} className="course-card">
                        <div className="course-image-wrapper">
                            <img src={course.image} alt={course.title} className="course-image" />
                            <span className="course-level">{course.level}</span>
                        </div>
                        <div className="course-content">
                            <h3 className="course-title">{course.title}</h3>
                            <div className="course-meta">
                                <div className="meta-item">
                                    <User size={14} /> <span>{course.instructor}</span>
                                </div>
                            </div>
                            <p className="course-description">{course.description}</p>

                            <div className="course-details-row">
                                <div className="course-info">
                                    <Clock size={14} /> {course.duration}
                                </div>
                                <div className="course-price">
                                    <DollarSign size={14} /> {course.price}
                                </div>
                            </div>

                            <button className="enroll-btn">Saiba Mais</button>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .courses-feed {
                    padding: 3rem 0;
                    max-width: 1000px;
                    margin: 0 auto;
                }
                
                .section-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-title {
                    font-family: var(--font-serif);
                    font-size: 2.8rem;
                    color: var(--color-primary);
                    margin: 0.5rem 0;
                }

                .section-subtitle {
                    font-family: var(--font-sans);
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: var(--color-secondary);
                    font-weight: 700;
                    display: block;
                }

                .section-line {
                    width: 80px;
                    height: 3px;
                    background: var(--color-accent);
                    margin: 1.5rem auto;
                }

                .section-desc {
                    max-width: 600px;
                    margin: 0 auto;
                    color: var(--color-text-muted);
                    font-size: 1.1rem;
                }

                .courses-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 2.5rem;
                    padding: 0 1rem;
                }

                .course-card {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }

                .course-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
                    border-color: var(--color-accent);
                }

                .course-image-wrapper {
                    position: relative;
                    height: 180px;
                    overflow: hidden;
                }

                .course-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .course-card:hover .course-image {
                    transform: scale(1.05);
                }

                .course-level {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(18, 18, 18, 0.85);
                    color: white;
                    padding: 0.3rem 0.8rem;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                    border-radius: 4px;
                    backdrop-filter: blur(4px);
                }

                .course-content {
                    padding: 1.5rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .course-title {
                    font-family: var(--font-serif);
                    font-size: 1.4rem;
                    color: var(--color-primary);
                    margin-bottom: 0.8rem;
                    line-height: 1.3;
                }

                .course-meta {
                    margin-bottom: 1rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-text-muted);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .course-description {
                    color: var(--color-text);
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    flex: 1;
                }

                .course-details-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid var(--color-border);
                    margin-bottom: 1.5rem;
                }

                .course-info, .course-price {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .course-info { color: var(--color-text-muted); }
                .course-price { color: var(--color-secondary); font-size: 1rem; }

                .enroll-btn {
                    width: 100%;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    padding: 0.9rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border-radius: 4px;
                }

                .enroll-btn:hover {
                    background: var(--color-secondary);
                    color: #121212;
                }
                
                /* Dark Mode Support */
                @media (prefers-color-scheme: dark) {
                    /* These styles are handled by global css mostly, but specific overrides here */
                }
            `}</style>
        </div>
    );
};

export default CoursesFeed;
