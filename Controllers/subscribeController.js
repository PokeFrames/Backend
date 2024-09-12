import db from "../database.js";

export const retrieveFidFromConverseWallet = (req, res) => {
  const { wallet } = req.params;

  db.get('SELECT fid FROM converse WHERE wallet = ?', [wallet], (err, row) => {
    if (err) {
      console.error('Error while retrieving fid from converse: ', err);
      return res.status(500).json({ message: 'An error occurred' });
    } 

    if(!row) {
      return res.status(404).json({ message: 'No fid found' });
    }
    
    res.status(200).json({ fid: row.fid });
  });
}

export const registerConverseWallet = (req, res) => {
  const { wallet, fid } = req.body;

  db.run('INSERT OR REPLACE INTO converse (wallet, fid) VALUES (?, ?)', [wallet, fid], (err) => {
    if (err) {
      console.error('Error while registering converse wallet: ', err);
      return res.status(500).json({ message: 'An error occurred' });
    }

    res.status(200).json({ message: 'Wallet registered successfully' });
  });
}