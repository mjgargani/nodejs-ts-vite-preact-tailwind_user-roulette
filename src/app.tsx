import RandomUser from './classes/RandomUser';
import Card from './components/Card';
import MainContainer from './components/MainContainer';

export function App() {
  // Const teste = new RandomUser({ nat: 'BR' });
  return (
    <MainContainer>
      <Card key="0" testId="card">
        Dados
      </Card>
    </MainContainer>
  );
}
