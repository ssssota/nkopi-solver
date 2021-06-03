#[derive(Debug, PartialEq)]
pub enum Block {
    Char(char),
    Pending,
    None,
}

impl From<char> for Block {
    fn from(c: char) -> Self {
        match c {
            'お' | 'う' | 'ち' | 'ま' | 'ん' | 'こ' => Block::Char(c),
            _ => Block::Pending,
        }
    }
}

impl Into<char> for Block {
    fn into(self) -> char {
        match self {
            Block::Char(c) => c,
            Block::Pending => '？',
            Block::None => '　',
        }
    }
}
