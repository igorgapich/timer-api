import { useEffect, useState } from "react";
import styled from 'styled-components';

const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
const apiUrl = 'http://worldtimeapi.org/api/timezone/Europe/Kyiv';

const TimerDiv = styled.div`
    background-color: ${props => props.bgColor};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
`;
const TimerH = styled.h1`
    color: ${props => props.textColor};
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  
    &:hover {
        background-color: #45a049;
    }
`;

const Timer = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [time, setTime] = useState();
    const [bgColor, setBgColor] = useState(randomColor());
    const [textColor, setTextColor] = useState(randomColor());
    const [showExtendedFormat, setShowExtendedFormat] = useState(false);
    const timeChange = () => {
        setCurrentTime(new Date().toLocaleTimeString());
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            timeChange();
            setBgColor(randomColor());
            setTextColor(randomColor());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setTime(data.utc_datetime);
            })
            .catch(err => {
                console.warn(err);
            });
    }, []);

    return (
        <>
            <div className="container-time">
                <TimerDiv bgColor={bgColor}>
                    <TimerH textColor={textColor}>{currentTime}</TimerH>
                    {showExtendedFormat && time && <TimerH textColor={textColor}>{time}</TimerH>}
                </TimerDiv>
            </div>
            <ButtonContainer>
                <Button onClick={() => setShowExtendedFormat(false)}>Короткий формат</Button>
                <Button onClick={() => setShowExtendedFormat(true)}>Розширений формат</Button>
            </ButtonContainer>
        </>
    );
}

export default Timer;
