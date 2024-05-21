import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

function Test() {
  return (


    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <div>Logo</div>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="home" href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="events">Events</Nav.Link>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="contacts">Contacts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="aboutus">About Us</Nav.Link>
      </Nav.Item>
    </Nav>

    //   <nav class="navbar navbar-dark bg-dark">
    //   <a class="navbar-brand" href="/">আমরা-আমরা</a>
    //   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    //   </button>
    //   {/* <div class="collapse navbar-collapse" id="navbarColor01"> */}
    //   <div class="collapse navbar-collapse" id="navbarColor01">
    //     <ul class="navbar-nav mr-auto">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Features</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Pricing</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">About</a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}

export default Test;
