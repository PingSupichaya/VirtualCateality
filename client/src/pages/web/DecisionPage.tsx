import { useNavigate } from 'react-router-dom'

export default function SelectPage(){
    const navigate = useNavigate();

    return( <div className="flex flex-col items-center justify-center gap-10">
                <p className="text-2xl font-bold mt-8">Which Cat you want to adopt?</p>
                <div className="flex items-center gap-15">
                    {/* Self select Card */}
                    <div>
                        <div className="bg-(--selfcard) w-[220px] h-[360px] sm:w-[404px] sm:h-[562px] border border-(--border) rounded-xl text-2xl text-center font-bold flex items-center justify-center"
                            onClick={() => {navigate(`/selectcat`)}}>
                            Select <br/> by <br/> myself</div>
                    </div>
                    {/* Quiz Card */}
                    <div>
                        <button className="bg-(--quizcard) w-[220px] h-[360px] sm:w-[404px] sm:h-[562px] border border-(--border) rounded-xl text-2xl text-center font-bold flex items-center justify-center"
                            onClick={() => {navigate(`/quiz`)}}>
                            Take a <br/> Quiz to <br/> get a cat</button>
                    </div>
                </div>
            </div>
    );
}