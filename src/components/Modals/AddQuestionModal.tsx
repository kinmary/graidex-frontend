import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { SetOpen } from "../MainAction";
import { Button, Col, Modal } from "react-bootstrap";
import { themes } from "../../constants/Themes";

type Props = {
  addQuestionHandler: (type: number) => void;
};

const  AddQuestionModal = ({addQuestionHandler}: Props) => {
  const dispatch = useAppDispatch();
  const main = useSelector((state: RootState) => state.main);
  const closeModal =() => {
    dispatch(SetOpen("addQuestionModal", false));
  }

  const handleAddQuestion = (type: number) => {
    addQuestionHandler(type);
    closeModal();
  }

  const {addQuestionModal} = main;

  return (
      <>
        <Modal show={addQuestionModal} onHide={closeModal} size="sm" centered>
          <Modal.Header closeButton>
            Create new question
          </Modal.Header>
          <Modal.Body>
            <Button variant={main.theme === themes.light ? "outline-dark" : "outline-light"} className="w-100 mb-2 text-start"
              onClick={() => handleAddQuestion(0)}
            >
              <i className="bi bi-record-circle me-2"></i>
              Single choice
            </Button>

            <Button variant={main.theme === themes.light ? "outline-dark" : "outline-light"} className="w-100 mb-2 text-start"
              onClick={() => handleAddQuestion(1)}
            >
              <i className="bi bi-ui-checks-grid me-2"></i>
              Multiple choice
            </Button>

            <Button variant={main.theme === themes.light ? "outline-dark" : "outline-light"} className="w-100 text-start"
              onClick={() => handleAddQuestion(2)}
            >
              <i className="bi bi-file-text me-2"></i>
              Open question
            </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
  
  
export default AddQuestionModal;
  