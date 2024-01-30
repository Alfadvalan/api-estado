import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


type IBGEUFResponse ={
  id: number;
  sigla: string;
  nome: string;
};

type IBGECITYResponse ={
  id: number;
  nome: string;
};


function App() {
  const[ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const[cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  
  useEffect(()=>{
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => {
      setUfs(response.data);
    });
  }, []);
  useEffect(()=>{
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
        setCities(response.data);
      });
  }, [selectedUf]);


  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
    const uf = event.target.value;
    setSelectedUf(uf)
  }
  
  return( 
  <>
  <div className="geral">
    <h1>seletor de ufs e cidades</h1>
    <div className="container">
      <select name="uf" id="uf" onChange={handleSelectedUf}>
        <option value="0">Selecione a UF</option>
        {ufs.map(ufs =>(
          <option key={ufs.id} value={ufs.sigla}>{ufs.nome}</option>
        ))}
      </select>

      <select name="city" id="city">
        <option value="0">Selecione a CIDADE</option>

        {cities.map(city =>(
          <option key={city.id} value={city.nome}>{city.nome}</option>
        ))}
      </select>
    </div>
  </div>
  </>


  
  )
}

export default App
