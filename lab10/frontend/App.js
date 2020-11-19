/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel';

let topicUnit = [];

const App: () => React$Node = () => {
  const axios = require('axios');

  const getTopics = () => {
    axios.get('http://localhost:3200/api/topics').then((res) => {
      topicUnit = res.data;
    });
  };

  const addQuestion = (question) => {
    axios
      .post('http://localhost:3200/api/questions', question)
      .then(refresh);
  };

  const [questionName, setQuestionName] = useState('');
  const [questionPricePerHour, setQuestionPricePerHour] = useState('');
  const [questionHours, setQuestionHours] = useState('');
  const [topicName, setTopicName] = useState('');

  const [addQuestionPanel, setAddQuestionPanel] = useState({
    fullWidth: true,
    onlyLarge: true,
    closeOnTouchOutside: true,
    onClose: () => closeQuestionPanel(),
    onPressCloseButton: () => closeQuestionPanel(),
    // ...or any prop you want
    style: {
      height: 450,
    },
  });
  const [isQuestionPanelActive, setIsQuestionPanelActive] = useState(false);

  const openAddQuestionPanel = () => {
    setIsQuestionPanelActive(true);
  };

  const closeQuestionPanel = () => {
    setQuestionName('');
    setQuestionPricePerHour('');
    setQuestionHours('');
    setTopicName('');
    setIsQuestionPanelActive(false);
  };

  const [summaryPanel, setSummaryPanel] = useState({
    fullWidth: true,
    onlyLarge: true,
    closeOnTouchOutside: true,
    onClose: () => closeSummaryPanel(),
    onPressCloseButton: () => closeSummaryPanel(),
    // ...or any prop you want
    style: {
      height: 450,
    },
  });
  const [isSummaryPanelActive, setIsSummaryPanelActive] = useState(false);

  const openSummaryPanel = () => {
    setIsSummaryPanelActive(true);
  };

  const closeSummaryPanel = () => {
    setIsSummaryPanelActive(false);
  };

  const getToggledQuestions = () => {
    const statuses = [...questionsStatuses];
    const ids = statuses
      .filter((question) => question.status)
      .map((question) => question.id);

    const allQuestions = topicUnit.map((topic) => topic.questions).flat(1);
    if (ids.length > 0) {
      const questions = allQuestions.filter((question) =>
        ids.includes(question.id),
      );
      return questions;
    }
    return [];
  };
  const getTotalHours = () => {
    const arr = getToggledQuestions();
    if (arr.length > 0) {
      return getToggledQuestions().reduce(
        (sum, question) => sum + question.hours,
        0,
      );
    } else {
      return 0;
    }
  };
  const getMoneyToPay = () => {
    const arr = getToggledQuestions();
    if (arr.length > 0) {
      return arr.reduce(
        (sum, question) => sum + question.hours * question.dollarsPerHour,
        0,
      );
    } else {
      return 0;
    }
  };

  const [topicsStatuses, setTopicsStatuses] = useState([]);
  const [questionsStatuses, setQuestionsStatuses] = useState([]);
  useEffect(() => {}, [questionsStatuses, topicsStatuses]);

  const refresh = () => {
    // // getTopics();
    // topicUnit = []
    axios
      .get('http://localhost:3200/api/topics')
      .then((res) => {
        topicUnit = res.data;
      })
      .then(() => {
        console.log('refresh');

        const statuses = topicUnit.map((topic) => {
          return {id: topic.id, status: true};
        });

        setTopicsStatuses(statuses);

        let qStatuses = topicUnit.map((topic) => {
          return [
            ...topic.questions.map((question) => {
              return {id: question.id, status: false};
            }),
          ];
        });
        qStatuses = qStatuses.flat(1);
        setQuestionsStatuses(qStatuses);
      });
  };


  const TopicRender = ({topicUnit: topicUnit}) => {
    // topicUnit.name
    // topicUnit.description
    // topicUnit.id
    const status = topicsStatuses.find((topic) => topic.id === topicUnit.id);

    const questions = topicUnit.questions;
    // question.id
    // question.question
    // question.hours
    // question.dollarPerHour
    // question.topicId

    const changeTopicState = () => {
      status.status = !status.status;
      setTopicsStatuses([
        ...topicsStatuses.filter((topic) => topic.id !== status.id),
        status,
      ]);
    };

    return (
      <View>
        <TouchableOpacity
          style={styles.topicContainer}
          onPress={changeTopicState}>
          <Text>{topicUnit.name}</Text>
          <Text>></Text>
        </TouchableOpacity>

        {status && status.status &&
          questions.map((question) => {
            const changeStatus = () => {
              let statuses = [...questionsStatuses];
              if (statuses.length > 0) {
                const status = statuses.find((s) => s.id === question.id);
                statuses = statuses.filter((s) => s.id !== question.id);
                status.status = !status.status;
                statuses.push(status);
                setQuestionsStatuses(statuses);
              }
            };

            const statuses = [...questionsStatuses];
            let status = {id: question.id, status: false};
            if (statuses.length > 0) {
              status = statuses.find((s) => s.id === question.id);
            }
            return (
              <>
                <TouchableOpacity
                  style={styles.questionContainer}
                  onPress={changeStatus}>
                  <View style={{width: '90%', flexDirection: 'row'}}>
                    <Text style={{width: '70%'}}>{question.question}</Text>
                    <Text style={{width: '15%'}}>
                      {`${question.dollarsPerHour}$`}
                    </Text>
                    <Text style={{width: '15%'}}>{question.hours}</Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {status && status.status && (
                      <View
                        style={[
                          {
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: 'black',
                            width: 22,
                            height: 22,
                          },
                          {backgroundColor: 'black'},
                        ]}
                      />
                    )}

                    {status && !status.status && (
                      <View
                        style={[
                          {
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: 'black',
                            width: 22,
                            height: 22,
                          },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{marginTop: 50}} />
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginBottom: 15,
          }}>
          <TouchableOpacity style={styles.buttonContainer} onPress={refresh}>
            <Text style={styles.buttonTitle}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={openAddQuestionPanel}>
            <Text style={styles.buttonTitle}>Add question</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{height: '77.5%', borderRadius: 35}}>
          <View style={{height: 15}} />

          {topicUnit.map((topic) => (
            <TopicRender topicUnit={topic} />
          ))}
        </ScrollView>
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: 'black',
            paddingHorizontal: 10,
            borderRadius: 50,
            width: 150,
            alignItems: 'center',
            alignSelf: 'center',
          }}
          onPress={openSummaryPanel}>
          <Text
            style={{
              color: 'white',
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}>
            Summary
          </Text>
        </TouchableOpacity>
      </View>

      <SwipeablePanel {...addQuestionPanel} isActive={isQuestionPanelActive}>
        <View style={{marginHorizontal: 16, marginTop: 5, height: '100%'}}>
          <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
            Add question
          </Text>
          <View style={styles.questionAddingContainer}>
            <Text style={styles.fieldTitle}>Question</Text>
            <TextInput
              style={styles.questionTextInput}
              onChangeText={(text) => setQuestionName(text)}
            />

            <Text style={styles.fieldTitle}>Price per Hour</Text>
            <TextInput
              style={styles.questionTextInput}
              keyboardType="decimal-pad"
              onChangeText={(text) => setQuestionPricePerHour(text)}
            />

            <Text style={styles.fieldTitle}>
              Hours needed for implementation
            </Text>
            <TextInput
              style={styles.questionTextInput}
              keyboardType="decimal-pad"
              onChangeText={(text) => setQuestionHours(text)}
            />

            <Text style={styles.fieldTitle}>Topic name</Text>
            <TextInput
              style={styles.questionTextInput}
              onChangeText={(text) => setTopicName(text)}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 30,
              backgroundColor: 'black',
              paddingHorizontal: 10,
              borderRadius: 50,
              width: 150,
              alignItems: 'center',
              alignSelf: 'center',
            }}
            onPress={() => {
              const question = {
                question: questionName,
                hours: +questionHours,
                dollarsPerHour: +questionPricePerHour,
                topicName: topicName,
              };
              addQuestion(question);
              closeQuestionPanel();
            }}>
            <Text
              style={{
                color: 'white',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </SwipeablePanel>

      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}
      {/*-----------------------------------------------------------------------*/}

      <SwipeablePanel {...summaryPanel} isActive={isSummaryPanelActive}>
        <View style={{marginHorizontal: 16, marginTop: 5, height: '150%'}}>
          <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: 16}}>
            Summary
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <Text style={{fontSize: 16}}>
              The development of your website will cost
            </Text>
            <Text style={{fontSize: 16}}>{`${getMoneyToPay()}$`}</Text>
            <Text style={{fontSize: 16}}>
              Total time that will be used for development
            </Text>
            <Text style={{fontSize: 16}}>{`${getTotalHours()} hours`}</Text>
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F4F4F4',
    height: '100%',
  },
  buttonContainer: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  buttonTitle: {
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  topicContainer: {
    marginHorizontal: 16,
    marginBottom: 10,

    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,

    backgroundColor: 'cyan',

    shadowRadius: 15,
    shadowOpacity: 0.05,
    shadowOffset: {
      height: 10,
      width: 2,
    },

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionContainer: {
    marginHorizontal: 16,
    marginBottom: 20,

    paddingVertical: 15,
    paddingHorizontal: 10,

    backgroundColor: 'white',
    borderRadius: 25,
    // height: 75,

    shadowRadius: 15,
    shadowOpacity: 0.12,
    shadowOffset: {
      height: 15,
      // width: 10,
    },

    flexDirection: 'row',
  },

  questionAddingContainer: {
    marginTop: 10,
    // height: 600,
    // backgroundColor: 'yellow'
  },
  questionTextInput: {
    marginVertical: 7,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
  },
  fieldTitle: {
    fontWeight: '500',
    color: '#b6b6b6',
  },
});

export default App;
