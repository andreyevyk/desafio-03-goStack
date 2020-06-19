import React, {useEffect} from "react";

import "./styles.css";
import { useState } from "react";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect( () =>{
    const handleAsync = async()=> {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    handleAsync();
  },[])

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const {data} = await api.post('repositories', repository)
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id))
  }
  return (
    <div id="main">
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}        
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>      
    </div>
  );
}

export default App;
