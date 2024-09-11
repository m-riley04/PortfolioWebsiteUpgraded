import "../AboutMe/AboutMe.scss";

function AboutMe() {

    return (
        <div className="about-me">
            <header>
                <h1>About Me</h1>
            </header>
            <section>
                <h2>Education</h2>
                <ul>
                    <li>University: University of Kansas</li>
                    <li>Major: Computer Science</li>
                    <li>Est. Graduation: May 2026</li>
                </ul>
            </section>
            <section>
                <h2>Technical Skills</h2>
                <ul>
                    <li>Programming/Markup Languages</li>
                    <li className="li-second-level">
                        <ul>
                            <li>C</li>
                            <li>C++</li>
                            <li>C#</li>
                            <li>JavaScript/TypeScript</li>
                            <li>HTML</li>
                            <li>CSS</li>
                        </ul>
                    </li>
                    <li>Other</li>
                    <li className="li-second-level">
                        <ul>
                            <li>Arduino Technology</li>
                            <li>Raspberry Pi Technology</li>
                        </ul>
                    </li>
                </ul>
            </section>
            <section>
                <h2>Personal Interests</h2>
                <ul>
                    <li>Violin (17+ years)</li>
                    <li>Programming</li>
                    <li>Data Collection</li>
                </ul>
            </section>
        </div>
    );
}

export default AboutMe;