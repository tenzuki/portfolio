import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Activity, Cpu } from 'lucide-react';
import './ModernClockCalendar.css';

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS_31 = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

const ModernClockCalendar = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsRotation = seconds * 6;
    const minutesRotation = minutes * 6;
    const hoursRotation = (hours % 12) * 30 + minutes * 0.5;

    // Day of week: 0 = Sun -> 7, 1 = Mon -> 1, etc.
    const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
    const currentDay = now.getDate(); // 1 - 31
    const currentMonth = now.getMonth() + 1; // 1 - 12

    // Dial ring rotations
    // Coding Stella's formula: initial rotation - sectionWidth * (index - 1)
    const range = 270;
    const dayNameSectionWidth = range / 7;
    const dayNameRotation = (135 - dayNameSectionWidth / 2) - dayNameSectionWidth * (dayOfWeek - 1);

    const monthSectionWidth = range / 12;
    const monthRotation = (135 - monthSectionWidth / 2) - monthSectionWidth * (currentMonth - 1);

    const daySectionWidth = range / 31;
    const dayRotation = (135 - daySectionWidth / 2) - daySectionWidth * (currentDay - 1);

    // Activity bar heights based on day of week
    const barColors = ['#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF', '#5856D6'];
    const barHeights = [45, 68, 82, 58, 90, 75, 40];

    return (
        <div className="modern-clock-widget">
            <div className="clock-hud-header">
                <div className="clock-hud-badge">
                    <span className="hud-pulse" />
                    <span>LIVE SYSTEM TELEMETRY</span>
                </div>
                <div className="clock-hud-location">
                    <MapPin size={13} />
                    <span>Ernakulam, IN (UTC+05:30)</span>
                </div>
            </div>

            <div className="clock-main-stage">
                {/* Outer Ring: Day of Month (01 - 31) */}
                <div className="clock-dial-ring ring-day">
                    <div 
                        className="clock-ring-rotator"
                        style={{ transform: `rotate(${dayRotation}deg)` }}
                    >
                        {DAYS_31.map((d, idx) => {
                            const isCurrent = (idx + 1) === currentDay;
                            return (
                                <span 
                                    key={d} 
                                    className={`dial-item dial-day ${isCurrent ? 'active-day' : ''}`}
                                    style={{
                                        transform: `rotate(${(idx * (range / 31))}deg)`
                                    }}
                                >
                                    {d}
                                </span>
                            );
                        })}
                    </div>
                    <div className="ring-indicator ring-indicator-day" />
                </div>

                {/* Middle Ring: Month (JAN - DEC) */}
                <div className="clock-dial-ring ring-month">
                    <div 
                        className="clock-ring-rotator"
                        style={{ transform: `rotate(${monthRotation}deg)` }}
                    >
                        {MONTHS.map((m, idx) => {
                            const isCurrent = (idx + 1) === currentMonth;
                            return (
                                <span 
                                    key={m} 
                                    className={`dial-item dial-month ${isCurrent ? 'active-month' : ''}`}
                                    style={{
                                        transform: `rotate(${(idx * (range / 12))}deg)`
                                    }}
                                >
                                    {m}
                                </span>
                            );
                        })}
                    </div>
                    <div className="ring-indicator ring-indicator-month" />
                </div>

                {/* Inner Ring: Day Name (MON - SUN) */}
                <div className="clock-dial-ring ring-dayname">
                    <div 
                        className="clock-ring-rotator"
                        style={{ transform: `rotate(${dayNameRotation}deg)` }}
                    >
                        {DAYS_OF_WEEK.map((d, idx) => {
                            const isCurrent = (idx + 1) === dayOfWeek;
                            return (
                                <span 
                                    key={d} 
                                    className={`dial-item dial-dayname ${isCurrent ? 'active-dayname' : ''}`}
                                    style={{
                                        transform: `rotate(${(idx * (range / 7))}deg)`
                                    }}
                                >
                                    {d}
                                </span>
                            );
                        })}
                    </div>
                    <div className="ring-indicator ring-indicator-dayname" />
                </div>

                {/* Center Core: Analog Clock Hands & Futuristic HUD */}
                <div className="clock-center-dial">
                    <div className="center-core-ring" />
                    
                    {/* Hour Hand */}
                    <div 
                        className="clock-hand-container hand-hour"
                        style={{ transform: `rotate(${hoursRotation}deg)` }}
                    >
                        <div className="hand-bar hand-bar-hour" />
                    </div>

                    {/* Minute Hand */}
                    <div 
                        className="clock-hand-container hand-minute"
                        style={{ transform: `rotate(${minutesRotation}deg)` }}
                    >
                        <div className="hand-bar hand-bar-minute" />
                    </div>

                    {/* Second Hand */}
                    <div 
                        className="clock-hand-container hand-second"
                        style={{ transform: `rotate(${secondsRotation}deg)` }}
                    >
                        <div className="hand-bar hand-bar-second" />
                    </div>

                    <div className="clock-center-pin" />

                    {/* Digital readout inside core */}
                    <div className="center-digital-display">
                        <span className="digital-time">
                            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                        <span className="digital-label">PARTHIV TIME</span>
                    </div>
                </div>

                {/* Left Side Ring Widget: Ambient Weather & Temperature */}
                <div className="side-telemetry-widget side-left">
                    <div className="telemetry-icon-box">
                        <Cloud size={16} color="#64b5f6" />
                    </div>
                    <div className="telemetry-val">28°C</div>
                    <div className="telemetry-sub">HUMID 74%</div>
                </div>

                {/* Right Side Ring Widget: Weekly Activity / Commit Velocity Bars */}
                <div className="side-telemetry-widget side-right">
                    <div className="activity-bars-grid">
                        {DAYS_OF_WEEK.map((d, idx) => (
                            <div key={d} className="telemetry-bar-col">
                                <div 
                                    className="telemetry-bar-fill" 
                                    style={{
                                        height: `${barHeights[idx]}%`,
                                        backgroundColor: barColors[idx],
                                        opacity: (idx + 1) <= dayOfWeek ? 1 : 0.35
                                    }}
                                />
                                <span className="telemetry-day-letter">{d[0]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="telemetry-sub" style={{ marginTop: '4px' }}>
                        <Activity size={10} style={{ display: 'inline', marginRight: '3px' }} />
                        SPRINT VELOCITY
                    </div>
                </div>
            </div>

            <div className="clock-hud-footer">
                <div className="hud-metric">
                    <Cpu size={12} color="#00ff88" />
                    <span>ENGINE: HIGH-PRECISION TICK</span>
                </div>
                <div className="hud-metric">
                    <span>STATUS: <strong style={{ color: '#00ff88' }}>ACTIVE & READY</strong></span>
                </div>
            </div>
        </div>
    );
};

export default ModernClockCalendar;
