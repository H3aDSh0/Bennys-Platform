import React from 'react';
import { faUser, faPhone, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StepperProps {
    step: number;
    totalSteps: number;
}


const Stepper: React.FC<StepperProps> = ({ step, totalSteps }) => {
    // Array de ícones
    const icons = [
        <FontAwesomeIcon icon={faUser}  key="user-icon"/>,
        <FontAwesomeIcon icon={faPhone}  key="phone-icon"/>,
        <FontAwesomeIcon icon={faIdCard} key="card-icon"/>
    ];

    const progressWidth = (step - 1) / (totalSteps - 1) * 100 + '%';

    return (
        <div className="w-full relative flex items-center justify-between">
            <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
            <div
               className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-900 transition-all duration-500"
                style={{ width: progressWidth }}
            ></div>
            {/* Mapeando e renderizando os ícones */}
            {icons.map((icon, index) => (
                <div
                    key={index}
                    className={`relative z-10 grid place-items-center w-10 h-10 rounded-full font-bold transition-all duration-300 ${index < step ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-900'
                        }`}
                >
                    {icon}
                </div>
            ))}
        </div>
    );
}

export default Stepper;
