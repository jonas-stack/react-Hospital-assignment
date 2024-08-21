// client/src/components/Utilities/Card.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    title: string;
    content: React.ReactNode;
    actions?: React.ReactNode;
    link?: string;
}

const Card: React.FC<CardProps> = ({ title, content, actions, link }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div>{content}</div>
                {actions && <div className="card-actions justify-end">{actions}</div>}
                {link && (
                    <div className="card-actions justify-end">
                        <Link to={link} className="btn btn-primary">View Details</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;