import type { ReactNode } from "react";

type BtnProps = {
    msg: string;
    onClick: () => void;
}

type LoginBtnProps = BtnProps & {
    icon?: ReactNode;
}

export const NavBtn = ({msg, onClick}: BtnProps) => {
    return (<button className="text-m sm:text-xl font-bold cursor-pointer 
            bg-(--btn-bg) px-4 border border-(--btn-border) rounded-xl"
            onClick={onClick}>
                {msg}</button>);
};

export const Btn = ({msg, onClick}: BtnProps) => {
    return (<button className="text-m sm:text-xl font-bold cursor-pointer 
            bg-(--btn-bg) px-4 rounded-xl"
            onClick={onClick}>
                {msg}</button>);
};

export const LoginBtn = ({msg, onClick, icon}: LoginBtnProps) => {
    return (<button className="w-full text-m sm:text-lg font-bold cursor-pointer 
            bg-white px-4 py-2 rounded-3xl flex items-center justify-center gap-3"
            onClick={onClick}>
                {icon}
                {msg}</button>);
};

export const QuizBtn = ({msg, onClick}: BtnProps) => {
    return (<button className="text-m sm:text-xl font-bold cursor-pointer 
            bg-(--btn-bg) px-4 py-2 rounded-xl"
            onClick={onClick}>
                {msg}</button>);
};

export const AnsBtn = ({msg, onClick}: BtnProps) => {
    return (<button className="w-full text-m sm:text-lg font-bold cursor-pointer 
            bg-(--btn-bg) px-4 py-3 rounded-3xl border border-(--border)"
            onClick={onClick}>
                {msg}</button>);
};

type CatCardProps = {
    breed: string;
    img: string;
    personality: string[];
    onClick?: () => void;
}

export const CatCard = ({breed, img, personality, onClick}: CatCardProps) => {
    return( <div>
                <button
                className="w-full aspect-[2/3] border border-(--border) rounded-xl bg-(--selfcard) 
                    text-center font-bold flex flex-col items-center justify-center gap-4 
                    cursor-pointer hover:scale-105 transition-transform overflow-hidden p-4"
                onClick={onClick}>
                    <p className="text-2xl">{breed}</p>
                    <img src={img} className="max-h-[50%] object-contain" alt={breed}/>
                    <div className="flex flex-wrap gap-2 justify-center px-2">
                        {personality.map((trait) => (
                            <span key={trait} className="text-sm bg-white/30 px-3 py-1 rounded-full">{trait}</span>
                        ))}
                    </div>
                </button>
            </div>);
};