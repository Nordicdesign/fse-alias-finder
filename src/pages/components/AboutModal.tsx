import Modal from "react-modal";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const AboutModal = (props: Props) => {
  const { isOpen, closeModal } = props;
  Modal.setAppElement("body");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="Modal"
      overlayClassName="Overlay"
      contentLabel="About this tool"
    >
      <header>
        <h2>What is this about?</h2>
        <button onClick={closeModal}>Close</button>
      </header>

      <p>
        This is a tool for{" "}
        <a href="https://fseconomy.net/" target="_blank" rel="noreferrer">
          FSEconomy
        </a>
        , a multi-player &quot;persistent world&quot; add-on for flight
        simulators. The idea is to help pilots find planes with similar
        performances so they can alias them on their sim.
      </p>

      <hr />

      <h3>Find alias to a FSE plane</h3>
      <p>
        Let&apos;s say you want to fly a Aeronca Champion, but your sim does not
        have that model. This option will help you find planes similar in
        performance, and hopefully you have one of them installed, so you can
        alias it to the Champion and fly your plane.
      </p>

      <h3>Find alias to a plane on your sim</h3>
      <p>
        On the flip side, maybe you love flying your Citation CJ4 on MSFS. Well
        turns out there are many planes on FSE with similar performance, so you
        could alias your CJ4 to a Citation II and save some money buying one!
      </p>
    </Modal>
  );
};
