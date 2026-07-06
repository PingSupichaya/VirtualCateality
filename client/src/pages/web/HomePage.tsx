import catGroup from '../../assets/catGroup.png'

export default function HomePage() {
    return( <div className="flex flex-col items-center gap-12">
                <p className="sm:text-2xl text-center font-bold pt-10"> Do you think you're ready for a cat? <br/>
                    if not, Let us help you find your answer </p>
                <img src={catGroup} alt="Group of cats" className="max-w-full" />
                <p className="text-sm sm:text-lg text-center px-10 sm:px-40">Virtual Cateality was made to help people who want a cat learn more about cats, understand their unique behaviors and personalities, and discover what it really takes to care for one.
                    <br/>Whether you are just curious or thinking about getting a cat, we hope you enjoy your time here and learn something new.
                    <br/><br/><br/>Built with love, coffee, and the developer's tears.</p>
            </div>)
}