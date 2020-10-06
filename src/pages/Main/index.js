import React, { useEffect, useState } from 'react';
import './style.css';
import api from '../../services/api';

import Personagem from '../../components/Personagem';

const Main = () => {
    const [list, setList] = useState([]);
    
    function alphabetical(data) {
        const arrayOrganize = []
        data.forEach((item) => {
            arrayOrganize.push({
                name: item.name,
                cor: item.eye_color
            });
        });
        const result = arrayOrganize.sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        return result;
    }

    useEffect(() => {
        api.get('/people')
            .then((response) => {
                const personagens = alphabetical(response.data.results);
                setList(personagens);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleRemove(item) {
        const newList = list.slice();
        for (var i = 0; i <= list.length; i++){
            if (list[i] === item) {
                newList.splice(i, 1);
            }
        };
        setList(newList);
        return
    }

    function showDropdown() {
        document.getElementById("dropdown-content").classList.toggle("show");
      }

    return(
        <main className="main-container">
                <div className="main-content"> 
                    {list.map((item) => (
                        <div className="main-personagem" key={item.name}>
                            <Personagem nome={item.name} cor={item.cor} />
                            <button 
                                type="button" 
                                className="remove-btn"
                                onClick={() => handleRemove(item)}
                            >Remover</button>
                        </div>
                    ))}
                </div>
                <button 
                    type="button"
                    className="main-dropdown-btn"
                    onClick={() => showDropdown()}
                >Dropdown</button>
                <div id="dropdown-content" className="main-dropdown-content">
                    {list.map((item) => (
                            <div className="main-personagem" key={item.name}>
                                <Personagem nome={item.name} cor={item.cor} />
                            </div>
                    ))}
                </div>
        </main>
    )
};

export default Main;