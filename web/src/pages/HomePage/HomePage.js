import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <div>
      <header className="home-header">
        <div>Logo goes here</div>
        <h1>
          <Link to={routes.home()}>TrainerTracker</Link>
        </h1>
      </header>

      <main>
        <div className="banner">
          <h1>Welcome to</h1>
          <h1>TrainerTracker</h1>
          <button>Sign up / Log in</button>
        </div>
        <div className="info">
          <p>APP INFO GOES HERE</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Malesuada fames ac turpis egestas. Ut diam quam nulla porttitor
            massa id neque. Sit amet mattis vulputate enim nulla aliquet. Congue
            eu consequat ac felis donec et odio. Dictum at tempor commodo
            ullamcorper a lacus vestibulum sed. Dui nunc mattis enim ut tellus.
            Est ante in nibh mauris cursus. Massa enim nec dui nunc mattis enim.
            Quisque sagittis purus sit amet volutpat consequat mauris nunc. Nam
            at lectus urna duis. Posuere ac ut consequat semper viverra nam. Et
            molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Dolor
            morbi non arcu risus. Mattis pellentesque id nibh tortor id aliquet
            lectus proin.
          </p>
          <p>
            Interdum varius sit amet mattis. Aliquet enim tortor at auctor urna
            nunc id cursus. A iaculis at erat pellentesque adipiscing commodo
            elit at imperdiet. A arcu cursus vitae congue mauris rhoncus aenean.
            Commodo odio aenean sed adipiscing. Aliquet enim tortor at auctor
            urna nunc id. Dolor sed viverra ipsum nunc aliquet bibendum enim
            facilisis gravida. Mauris ultrices eros in cursus turpis massa
            tincidunt. In hendrerit gravida rutrum quisque non tellus. Sagittis
            eu volutpat odio facilisis. Duis ut diam quam nulla. Arcu cursus
            vitae congue mauris rhoncus aenean vel elit scelerisque. Diam quis
            enim lobortis scelerisque. Tellus elementum sagittis vitae et leo
            duis ut. Integer feugiat scelerisque varius morbi enim nunc.
          </p>
        </div>
      </main>

      <footer>
        <div>Footer info goes here</div>
      </footer>
    </div>
  )
}

export default HomePage
