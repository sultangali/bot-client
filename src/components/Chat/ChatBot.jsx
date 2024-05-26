import React from 'react'
import {  Row, Col, Breadcrumb } from "react-bootstrap"
import * as user from '../../redux/slices/user.js'
import './index.scss'
import { useDispatch } from 'react-redux';

const ChatBot = () => {

    const dispatch = useDispatch()

    const [messages, setMessages] = React.useState([
        
       
        { sender: 'bot', text: `Біздің құрастырған чат-ботымызға қоюға болатын сұрақтар:` },
        { sender: 'bot', text: `1. Кітап туралы ақпарат керек: [Кітап атауы]` },
        { sender: 'bot', text: `2. Авторда қандай кітаптар бар: [Автор аты]` },
        { sender: 'bot', text: `3. Категория бойынша кітаптарды тауып бер: [Категория атауы]` },
        { sender: 'bot', text: `4. Маған кітаптар ұсыншы` },
        { sender: 'bot', text: `5. Қоймада осы кітап бар ма: [Кітап атауы]` },
        { sender: 'bot', text: `6. Осы кітап қанша тұрады: [Кітап атауы]` },
        { sender: 'bot', text: 'Сәлеметсіз бе! Мен сіздің кітап дүкеніндегі көмекшіңізмін. Мен сізге қалай көмектесе аламын?' },
    ]);

    const [message, setMessage] = React.useState('');

    const messagesEndRef = React.useRef(null);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        const userMessage = { sender: 'user', text: message };
        setMessages([...messages, userMessage]);

        const data = await dispatch(user.fetchChatBot({message})) 

        const botMessage = { sender: 'bot', text: data?.payload?.reply };

        console.log(botMessage)
        setMessages([...messages, userMessage, botMessage]);
        setMessage('');

        dispatch(user.fetchAuthMe())
    }

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className='container'>
            <Row className="sign-card">
                <Col>
                    <div>
                        <br />
                        <h2>ЧАТ-БОТ</h2>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Басты бет</Breadcrumb.Item>
                            <Breadcrumb.Item active href="/chat">
                                Чат-бот
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <hr />
                        <Row>
                            <Col lg={12} md={12} className='d-flex col justify-content-center text-center'>
                                <div className="chat-container w-100">
                                    <header className="chat-header">
                                        <h1>Кітап дүкені</h1>
                                    </header>
                                    <div className="chat-window">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={`message ${msg.sender}`}>
                                                {msg.text}
                                            </div>
                                        ))}
                                         <div ref={messagesEndRef} />
                                    </div>
                                    <div className="message-input">
                                        <input 
                                            type="text" 
                                            value={message}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Сұрағыңызды жазыңыз..." 
                                        />
                                        <button onClick={sendMessage}>Жіберу</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <br />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ChatBot;