import React, { useState } from 'react';

const Home = () => {
    const [eunit, setEunit] = useState("")
    const onSubmit = (e) =>{
        e.preventDefault();
    }
    const onChage = (e) =>{
        const {target : {value}} = e;
        setEunit(value);
    }
    return (
        <div>
            <form>
                <input type="text" placeholder="하고 싶은 말을 입력하세요!" maxLength={120} value={eunit} onChange={onChage} />
                <input type="submit" value="eunitt!" />
            </form>
        </div>
    )
}

export default Home