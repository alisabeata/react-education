//start
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  return (<div>...</div>);
}

ReactDOM.render(<App />, document.getElementById('root'));
  
// основные концепции
// - Virtual DOM
// - Компонентная разработка
// - JSX
  
// (!) важно использовать иммутабельные данные

  
// Можно исп Component или PureComponent, а так же обычные функции (в этом случае нет state)
// PureComponent предпочтительно для регулярного использования, разница закл. в особенностях исп shouldComponentUpdate
// если props остались прежними, компонента не будет заново создавать свой virtual dom слепок, и реакт будет использовать прежний слепок. 
// https://medium.com/frontend-notes/purecomponent-%D0%B8-components-5c15cf206ba7


// example
class Time extends Component {
  render() {
    const nowDate = new Date().toString();

    return (
      <div>
        <p className="test">{1 + 1}</p>
        <p>{nowDate}</p>
        <ul>
          {list.map(el => <li key={el}>{el}</li>)}
        </ul>
        <Greeting />
        <Button />
      </div>
    );
  }
}


// рекомендуется объявл переменные для пропс
render() {
  const {color, data} = this.props; // <<
  return (
    <div>
      <FirstChild color={color} data={data} />
    </div>
  );
}


// если super вызывается с props, то внутри конструктора доступно this.props
constructor(props) {
  super();
  super(props);
}





// url request
constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    data: []
  }
}

componentDidMount() {
  fetch().then(data => {
    this.setState({isLoading: false, data: data})
  });
}

render() {
  const {isLoading, data} = this.state;
  
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return <div>{data}</div>;
}




// если запрос в процессе обработки, а компонента отмонтирвана (пользователь нажал активировал др компонент), то фиксится
constructor(props) {
  ...
  this._isMounted = false;
}

componentDidMount() {
  this._isMounted = true;
  fetch().then(data => {
    if (this._isMounted) {
      this.setState({isLoading: false, data: data})
    }
  });
}

componentWillUnmount() {
  this._isMounted = false;
}





// обработка ошибок у child-компонентов
state = {
  error: null,
  errorInfo: null
}

componentDidCatch(error, info) {
  this.setState({
    error,
    errorInfo
  });
}

// parent render
render() {
  if (counter === 3) {
    throw new Error('error!');
  }
  
  return <div>{counter}</div>;
}

// child render
render() {
  const {counter, error} = this.state;
  
  if (error) {
    return <p>{String(error.text)}</p>;
  } else {
    return <div>{counter}</div>;
  }
}

  
  
  
// создание темплейта, передача children узла
render() {
  return (
    <div>
      <Title>Title text</Title>
    </div>
  );
}
  
function Title(props) {
  // >> <p className="title">Title text</p>
  return (
    <div>
      <p className="title">{props.children}</p> 
    </div>
  );
}
  
// для нескольких children исп React.Children.map, map Array не подходит, тк может быть одно значение, которое не будет являться массивом 
function Title(props) {
  return (
    <div>
      <p className="title">{React.Children.map(props.children, el => <span key={el}>{el}</span>)}</p> 
    </div>
  );
}
  