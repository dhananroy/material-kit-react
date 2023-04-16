import { MdOutlineArrowRightAlt } from 'react-icons/md';
import Header from './Header';
import Footer from './Footer';

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="App">
        <section className="wrapper">
          <div className="container">
            <div className="grid-cols-2">
              <div className="grid-item-1">
                <h1 className="main-heading">
                  Welcome to <span>Ucmate</span>
                  <br />
                  Your Ultimate Destination.
                </h1>
                <p className="info-text">
                  Empower Your AI Projects with Ucmate's Cutting-Edge Tools and APIs!
                </p>

                <div className="btn_wrapper">
                  <a href='/login'>
                  <button className="btn view_more_btn">
                    
                    <MdOutlineArrowRightAlt style={{ width: '32px', height: '32px' }} />
                  
                  </button>
                  </a>

                  <button className="btn documentation_btn">documentation</button>
                </div>
              </div>
              <div className="grid-item-2">
                <div className="team_img_wrapper">
                  <img src="/assets/illustrations/team.svg" alt="team-img" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
