import { Component } from "react";
import "./styles/typing-test.css";
function num(min, max) {
    var last,      // keeping the last random value
        value,     // value which is repeated selected
        count = 0, // count of repeated value
        getR = function () { return Math.floor(Math.random() * (max - min)) + min; };

    if (min >= max) {
        throw 'Selected interval [' + min + ', ' + max + ') does not work for random numbers.';
    }
    return function () {
        var random;
        if (count && value !== last) {
            --count;
            return last = value;
        }
        random = getR();
        while (random === last) {
            value = random;
            ++count;
            random = getR();
        }
        return last = random;
    };
}
function Text() {
    const sentences = {
        "easy": [
            "Scolding is something common in student life. Being a naughty boy, I am always scolded by my parents. But one day I was severely scolded by my English teacher. She infect teaches well. But that day, I could not resist the temptation that an adventure of Nancy Drew offered. While she was teaching, I was completely engrossed in reading that book. Nancy Drew was caught in the trap laid by some smugglers and it was then when I felt a light tap on my bent head. The teacher had caught me red handed. She scolded me then and there and insulted me in front of the whole class. I was embarrassed. My cheeks burned being guilty conscious. When the class was over, I went to the teacher to apologize. When she saw that I had realized my mistake, she cooled down and then told me in a very kind manner how disheartening it was when she found any student not paying attention. I was genuinely sorry and promised to myself never to commit such a mistake again.",
            "Days are not of equal value in one's life. Some bring happiness while others bring sadness. Sadness and happiness both are equally important to man's life, since they are the two sides of a coin. As we cannot forget the happiest day, we are unable to forget the saddest day of our life too. The saddest day of my life was the Diwali Day. Diwali is considered to be a happy festival and till last Diwali, it was my favorite festival. On last Diwali, my sister, my brother and I were busy lighting the fireworks. I was holding a 'fuljhari' in my hand and unfortunately my younger brother, who was standing just beside me, had a cracker in his hand. This cracker caught fire and a very loud explosion was heard which shook my sister and me. After that, we all could think of nothing else than blood stained cotton, bandage, dettol etc. My cousin took my brother to the doctor where he got 14 stitches in his forefinger and thumb. But at home, everybody kept cursing and blaming me for the mishap. That night, I could not sleep and I cried a lot. For next few days, I bore the burden of this blame for being responsible for this unfortunate incident. I felt deeply guilty conscious which I was able to overcome after a long time.",
            "Studying is the main source of knowledge. Books are indeed never failing friends of man. For a mature mind, reading is the greatest source of pleasure and solace to distressed minds. The study of good books ennobles us and broadens our outlook. Therefore, the habit of reading should be cultivated. A student should never confine himself to his schoolbooks only. He should not miss the pleasure locked in the classics, poetry, drama, history, philosophy etc. We can derive benefit from other's experiences with the help of books. The various sufferings, endurance and joy described in books enable us to have a closer look at human life. They also inspire us to face the hardships of life courageously. Nowadays there are innumerable books and time is scarce. So we should read only the best and the greatest among them. With the help of books we shall be able to make our thinking mature and our life more meaningful and worthwhile.",
            "Recently, an exhibition 'Building A New India' was held in the capital. It was organized by the Ministry of Information and Broadcasting, Government of India. The exhibition was set up in the Triveni Kala Sangam. The chief exhibits were photographs, novels, some sculptures by Indian modern artists presenting Indian cultural inheritance. First of all, I visited the general section of the exhibition where different charts and photographs depicting India's development in various fields were set. Most impressive photographs among these were those showing India's nuclear development. The second section dealt with India's magnificent historical background. I was fascinated by the pictures of Mohanjodaro excavation. Then I saw the most beautiful and colorful section of the exhibition i.e. the cultural section. It consisted of paintings, sculptures, photographs etc. The Rajasthani and Gujarati paintings were very colourful and attractive. This exhibition, inaugurated by the Prime Minister, lasted for a week. It proved to be of great educational value. It brushed up my knowledge about India as my motherland. It enhanced my respect for my great country, India. I would very much appreciate if the Indian government organized some more such exhibitions."
        ],
        "hard": [
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, ducimus debitis. Cumque nemo minima tenetur ea recusandae aut sint? Distinctio fuga recusandae aliquid molestiae fugit culpa quasi cum, architecto veritatis?"
        ]
    }
    let choosen = "easy";
    const getR = num(0, sentences[choosen].length)();
    return (
        sentences[choosen][getR].substring(0, 200)
    )
}
class Tabs extends Component {
    render() {
        return (
            <>
                <input id="tab1" name="group" type="radio" defaultChecked />
                <input id="tab2" name="group" type="radio" />
                <div className="tabs">
                    <label htmlFor="tab1">Typing Test</label>
                    <label htmlFor="tab2">Practice</label>
                </div>
            </>
        )
    }
}
let classForLetter = "correct";
let time = -1;
let intervalID;
localStorage.getItem("totalTime") || localStorage.setItem("totalTime", 0);
function typingListener(event) {
    let totalCharacters_E = document.querySelector(".totalCharacters");
    let edidtableText_E = document.querySelector(".editableText");
    let inputArea = document.querySelector(".inputArea[data-text]");
    event.preventDefault();
    let currKey = event.key;
    if (currKey == " " || event.which >= 48) {
        let index = edidtableText_E.children.length;
        if (index === 199) {
            let accuracy = document.querySelectorAll("span.correct").length * 100 / 200;
            let wpm = Math.floor(inputArea.getAttribute("data-text").split(" ").length/(time/60));
            
            return (function update() {
                document.querySelector(".accuracy").innerHTML = accuracy+"%";
                document.querySelector(".WPM").innerHTML = wpm;
                inputArea.setAttribute("data-text", Text());
                totalCharacters_E.innerHTML = `<span className="value">0</span>/200</span>`;
                edidtableText_E.innerHTML = ""; index = 0;
                clearInterval(intervalID);
                localStorage.setItem("totalTime", JSON.parse(localStorage.getItem("totalTime")) + 0.05);
            })()
        }
        document.querySelector(".totalCharacters").innerHTML = `<span className="value">${index + 1}</span>/200</span>`
        if (inputArea.getAttribute("data-text").split("")[index] === currKey) {
            edidtableText_E.insertAdjacentHTML("beforeend", `<span class='${classForLetter}'>${currKey}</span>`)
            classForLetter = "correct";
        } else classForLetter = "wrong";
    }
    if (time === -1) {
        time = 0; intervalID = setInterval(() => time += 1, 1000)
    }
}
class TabContent extends Component {
    render() {
        return (
            <div className="main_content">
                <nav className="topBar">
                    <div style={{ whiteSpace: "pre", display: "flex", gap: "20px" }}><span>Speed: <span style={{ color: "#fff" }} className="WPM">{this.props.speed}</span> wpm</span> | <span>Accuracy: <span style={{ color: "#fff" }} className="accuracy">{this.props.accuracy}</span></span></div>
                    <progress className="timeSpent" value={this.props.progress_timeSpent} title="Time spent for half an hour"></progress>
                    <span className="totalCharacters"><span className="value">0</span>/200</span>
                </nav>
                <div className="inputArea" data-text={Text()} onKeyDown={typingListener}>
                    <span contentEditable className="editableText"></span>
                </div>
            </div>
        )
    }
}
class TypingTestBoard extends Component {
    render() {
        return (
            <div className="container">
                <Tabs />
                <TabContent speed="0" accuracy="0%" progress_timeSpent={localStorage.getItem("totalTime")} />
            </div>
        )
    }
}
export default TypingTestBoard;