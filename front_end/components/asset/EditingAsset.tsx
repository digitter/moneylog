import * as React from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux'
import { editAssets } from '../../modules/AssetModule'
import { updateAsset } from '../../services/AssetService'
import Asset from '../../models/Asset';
import Button from '@material-ui/core/Button'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

interface Props {
 asset: Asset
}

const EdtingAsset: React.FC<Props>  = (props) => {
  const dispatch = useDispatch()

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  const [id] = React.useState(props.asset.id);
  const [title, setTitle] = React.useState(props.asset.title);
  const [amount, setAmount] = React.useState(props.asset.amount);
  const [content, setContent] = React.useState(props.asset.content);

  const handleAssetChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (event.currentTarget.name) {
      case 'title':
        setTitle(event.currentTarget.value)
        break;
      case 'amount':
        setAmount(Number(event.currentTarget.value))
        break;
      case 'content':
        setContent(event.currentTarget.value)
        break;
      default: return null
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateAsset({ id, title, amount, content })
      .then(jsonApiFormat => {
        dispatch(editAssets(Asset.fromSerialized(jsonApiFormat)))
      })
      .catch(response => {
        console.error(response)
      })
  }

    return (
      <React.Fragment>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            style={{width: 60, background: '#0F7C3F', color: 'white', fontSize: 10}}
            onClick={openModal}
          >
            EDIT
          </Button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>

          <form onSubmit={handleSubmit}>
            <input
              name='title'
              placeholder='Title'
              defaultValue ={title}
              onChange={handleAssetChange}
            />

            <input
              type='number'
              name='amount'
              placeholder='Amount'
              defaultValue ={amount}
              onChange={handleAssetChange}
            />

            <textarea
              name='content'
              placeholder='Content'
              defaultValue ={content}
              onChange={handleAssetChange}
            />

            <button type='submit'>update</button>
            <button onClick={closeModal}>close</button>
          </form>
        </Modal>
      </React.Fragment>
    )
}

export default EdtingAsset