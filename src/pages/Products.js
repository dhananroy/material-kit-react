import { Card, Button, Rate, Space } from 'antd';
import { AndroidFilled, GlobalOutlined } from '@ant-design/icons';
import Header from './Header';
import Footer from './Footer';

export default function Products() {
  return (
    <>
      <Header />

      <main className="App">
        <section className="wrapper">
          <div className="container">
          <h1 className="centered">Products</h1>
              <div className="card-container">
              <Card 
                  title={
                    <img
                      src="/assets/icons/ucmate_icon.png"
                      width={32}
                      alt="Ucmate Play app logo"
                    />
                  }
                  extra={
                    <Button type="primary" size="small" style={{ backgroundColor: "#19a360" }}>
                      Free <AndroidFilled />
                    </Button>
                  }
                  className="card"
                >
                  <h1>Ucmate Play</h1>
                  <small>Multimedia App</small>
                  <p>
                    Ucmate is an Android app that lets you download YouTube videos and play them
                    directly from the app.
                  </p>
                  <br />
                  <p>
                    <Button type="primary">Try now</Button>
                  </p>
              </Card>


              <Card
                  title={
                    <img
                      src="/assets/icons/uaichat.png"
                      width={32}
                      alt="Ucmate Chat logo"
                    />
                  }
                  extra={
                    <Button type="primary" size="small" style={{ backgroundColor: "#19a360" }}>
                      Free <GlobalOutlined />
                    </Button>
                  }
                  className="card"
                >
                  <h1>UChat</h1>
                  <small>AI App</small>
                  <p>
                   UChat is a chatbot that provides instant information and answers to your questions.
                  </p>
                  <br />
                  <p>
                    <Button type="primary">Try now</Button>
                  </p>
              </Card>

      
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
