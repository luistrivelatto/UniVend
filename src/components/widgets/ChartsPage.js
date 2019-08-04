import React from "react";
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataPie: {
      labels: ["Crítico", "Ideal", "Razoável"],
      datasets: [
        {
          data: [100, 200, 300],
          backgroundColor: [
            "#FF2922",
            "#38E896",
            "#EAEB5F",
            "#949FB1",
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF726E",
            "#3DFFA5",
            "#FFFF66",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <MDBContainer>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;