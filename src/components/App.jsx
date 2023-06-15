// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };


import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from '../services/api';
import { Button } from './Button/Button';
import { Container } from './App.styled';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    showModal: false,
    modalImageUrl: '',
    loader: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery &&
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.setState({
        images: [],
        loader: true,
      });
      const images = await getImages(this.state.searchQuery, this.state.page);
      this.setState({
        images: images.hits,
        page: 2,
        loader: false,
      });
    }
  }

  handleSubmit = ({ searchQuery }) => {
    this.setState({
      searchQuery: searchQuery.trim(),
    });
  };

  handleLoadMore = async () => {
    this.setState({
      loader: true,
    });

    const images = await getImages(this.state.searchQuery, this.state.page);
    this.setState(prevState => {
      return {
        images: [...prevState.images, ...images.hits],
        page: prevState.page + 1,
        loader: false,
      };
    });

    const { height: cardHeight } = document
      .querySelector('.css-19a4j35')
      .firstElementChild.getBoundingClientRect();
    console.log('first', cardHeight);

    setTimeout(() => {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 250);
  };

  openModal = modalImageUrl => {
    this.setState({
      modalImageUrl,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <Container>
        {this.state.showModal && (
          <Modal
            modalImageUrl={this.state.modalImageUrl}
            closeModal={this.closeModal}
          />
        )}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        <Loader visible={this.state.loader} />
        {this.state.images.length !== 0 && !this.state.loader && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </Container>
    );
  }
}