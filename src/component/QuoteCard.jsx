import React, { useEffect, useState } from 'react'
import axios from 'axios';
function QuoteCard() {
    const [quotesData, setQuotesData] = useState([]);
    const [currentQuote, setCurrentQuote] = useState({});
    const [dividerImg, setDividerImg] = useState("/pattern-divider-desktop.svg");
    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/quotes");
                const result = response.data.quotes;
                setQuotesData(result);

                if (result.length > 0) {
                    setCurrentQuote(result[Math.floor(Math.random() * result.length)]);
                }
            } catch (error) {
                console.error("Error fetching quotes:", error);
            }
        };

        fetchQuotes();

          // Media query to change the image source for screens <= 375px
          const mediaQuery = window.matchMedia("(max-width: 375px)");
          const handleMediaQueryChange = (e) => {
              if (e.matches) {
                  setDividerImg("/pattern-divider-mobile.svg");
              } else {
                  setDividerImg("/pattern-divider-desktop.svg");
              }
          };
          handleMediaQueryChange(mediaQuery);
          
          // Attach listener
          mediaQuery.addEventListener( "change",handleMediaQueryChange);
  
          // Cleanup the listener when the component unmounts
          return () => {
              mediaQuery.removeEventListener( 'change', handleMediaQueryChange);
          };

    }, []);
    const getRandomQuote = () => {
        if (quotesData.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotesData.length);
            setCurrentQuote(quotesData[randomIndex]);
        }
    };
    return (
        <>
            {/* header */}
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/Quotify.png" alt="Logo" height={35} width={35} />
                <h2 style={{ display: 'inline', marginLeft: '8px' }}>Quotify</h2>
                <h4> &ldquo; let Qoutify be your daily source of encouragement &rdquo;</h4>
            </nav>

            {/* card Container */}
            <div className="container">
                <div className="card">
                    <h5>{currentQuote.author}</h5>
                    <p> &ldquo;{currentQuote.quote}&rdquo;</p>
                    <img src={dividerImg} alt="" />
                    <button onClick={getRandomQuote}>
                        <img src="/icon-dice.svg" alt="" height={25} width={25} />
                    </button>
                </div>
            </div>
            {/* Footer */}
            <footer style={{ display: 'flex', alignItems: "baseline", justifyContent: "space-around" }}>
                <div >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/Quotify.png" alt="Logo" height={35} width={35} />
                        <h2 style={{ display: 'inline', marginLeft: '8px' }}>Quotify</h2>
                    </div>
                    <h5 className='logo_qotes'>Qoutify is your go-to destination for inspiration and wisdom, offering a curated collection of powerful quotes from renowned thinkers, authors, and visionaries. Whether you seek motivation, reflection, or simply a moment of pause in your busy day, Qoutify provides a fresh quote to uplift your spirits and spark your creativity. Join us in exploring the thoughts that shape our world, one quote at a time.

                        Stay inspired and never miss a moment of insight—let Qoutify be your daily source of encouragement!</h5>
                </div>

                <div style={{ padding: '0px', margin: "0px" }}>
                    <h3>Contact Us</h3>
                    <i style={{ marginRight: '8px' }} className="fa-brands fa-instagram fa-2x"></i>
                    <i style={{ marginRight: '8px' }} className="fa-brands fa-facebook fa-2x"></i>
                    <i style={{ marginRight: '8px' }} className="fa-brands fa-square-x-twitter fa-2x"></i>
                    <i class="fa-brands fa-reddit fa-2x"></i>
                </div>
            </footer>
        </>
    )
}

export default QuoteCard