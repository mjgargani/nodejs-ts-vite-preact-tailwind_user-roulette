import { useEffect } from 'preact/hooks';
import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';

export function App() {
  useEffect(() => {
    const teste: RandomUser = new RandomUser({
      results: 10,
      seed: 'eita',
      page: 3,
      nat: ['br', 'fr'],
      inc: ['name'],
      exc: ['gender'],
    });
    teste
      .retrieve()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <MainContainer>
      <Card key="0" testId="card">
        Dados
      </Card>
    </MainContainer>
  );
}
