import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      padding: 40,
    },
    heading: {
      fontSize: 24,
      marginBottom: 20,
    },
    content: {
      fontSize: 12,
      marginBottom: 10,
    },
});

const PDFGenerator = ({ htmlContent, onSave }) => {
    const handleSave = async () => {
      const blob = await document.getElementById('pdf').toBlob();
      onSave(blob);
    };
  
    return (
      <div>
        <button onClick={handleSave}>Save PDF</button>
        <Document id="pdf">
          <Page size="A4" style={styles.page}>
            <View>
              <Text style={styles.heading}>PDF Generated from HTML</Text>
              <Text style={styles.content}>{htmlContent}</Text>
            </View>
          </Page>
        </Document>
      </div>
    );
  };
  
  export default PDFGenerator;