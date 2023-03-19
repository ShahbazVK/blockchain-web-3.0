import React from 'react'
import { TheModal } from './TheModal'

export const Navbar = () => {
    return (
        <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
                <div className="nav-title">
                    EthTransfer
                </div>
            </div>
            <div className="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className="nav-links">
                <a href="http://www.github.com/shahbazvk" target="_blank">Github</a>
                <a href="https://www.linkedin.com/in/shahbaz-ali-4a80a220a/" target="_blank">LinkedIn</a>
                <a href="#"><TheModal /></a>

            </div>
        </div>
    )
}
