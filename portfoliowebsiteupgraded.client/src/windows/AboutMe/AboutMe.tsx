import "../AboutMe/AboutMe.scss";

function AboutMe() {

    const languages: string[] = [
        "Python",
        "C",
        "C++",
        "C#",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "SQL",
        "LatEx"
    ];

    const frameworksTools: string[] = [
        ".NET",
        "Qt",
        "Tkinter",
        "Node.js",
        "Git",
        "Docker",
        "Unity",
        "Gamemaker Studio (1/2)"
    ];

    const librariesApi: string[] = [
        "React.js (Vite)",
        "Anki",
        "Spotify API",
        "OpenAI API"
    ];

    const operatingSystems: string[] = [
        "Windows",
        "Linux (Ubuntu)",
        "macOS"
    ];

    const otherSkills: string[] = [
        "Soldering/Wiring",
        "Arduino Boards",
        "Raspberry Pi",
        "Graphic Design",
        "DSLR Photography and Videography",
    ];

    const personalInterests: string[] = [
        "Violin (17+ years)",
        "Programming",
        "Data Collection",
        "Photography and Graphic Design"
    ];

    const technicalSkillsSection = <>
        <h2>Technical Skills</h2>
        <ul>
            <li>Computer Languages</li>
            <li className="li-second-level">
                <ul>
                    {languages.map((lang) => <li>{lang}</li>)}
                </ul>
            </li>
            <li>Frameworks/Tools</li>
            <li className="li-second-level">
                <ul>
                    {frameworksTools.map(ft => <li>{ft}</li>)}
                </ul>
            </li>
            <li>Libraries/API</li>
            <li className="li-second-level">
                <ul>
                    {librariesApi.map(lib => <li>{lib}</li>)}
                </ul>
            </li>
            <li>Operating Systems</li>
            <li className="li-second-level">
                <ul>
                    {operatingSystems.map(os => <li>{os}</li>)}
                </ul>
            </li>
            <li>Other</li>
            <li className="li-second-level">
                <ul>
                    {otherSkills.map(o => <li>{o}</li>) }
                </ul>
            </li>
        </ul></>;

    const educationSection = <><h2>Education</h2>
        <ul>
            <li>University: University of Kansas</li>
            <li>Major: Computer Science</li>
            <li>Est. Graduation: May 2026</li>
        </ul></>

    const personalInterestsSection = <><h2>Personal Interests</h2>
        <ul>
            {personalInterests.map(i => <li>{i}</li>) }
        </ul></>

    const portraitSection = <><img src="images/linkedin_headshot_rm.jpg" /></>

    return (
        <div className="about-me">
            <header>
                <h1>About Me</h1>
            </header>
            <div className="content">
                <div className="left-column">
                    <section className="technical-skills" children={technicalSkillsSection} />
                </div>
                <div className="right-column">
                    <section className="portrait" children={portraitSection} />
                    <section className="education" children={educationSection} />
                    <section className="personal-interests" children={personalInterestsSection} />
                </div>
            </div>
        </div>
    );
}

export default AboutMe;